import json
import sys
from pathlib import Path

import shapefile
from shapely.geometry import Polygon, box, shape

REGION = box(1, 10, 59, 46)
SIZE = (1170, 690)
TARGETS = {'SYR': 'Damascus', 'IRQ': 'Baghdad', 'YEM': 'Sanaa',
           'LBY': 'Tripoli', 'TUN': 'Tunis'}
HUBS = {'SAU': 'Riyadh', 'dubai': 'Dubai'}


def project(longitude, latitude):
    return [round((longitude - REGION.bounds[0]) / 58 * SIZE[0], 1),
            round((REGION.bounds[3] - latitude) / 36 * SIZE[1], 1)]


def ring_path(ring):
    points = [project(x, y) for x, y in list(ring.coords)[:-1]]
    return 'M' + ' '.join(f'{x:g},{y:g}' for x, y in points) + 'Z'


def polygon_path(geometry):
    if geometry.is_empty:
        return ''
    if isinstance(geometry, Polygon):
        return ring_path(geometry.exterior) + ''.join(map(ring_path, geometry.interiors))
    if hasattr(geometry, 'geoms'):
        return ''.join(map(polygon_path, geometry.geoms))
    return ''


def countries(source):
    data = shapefile.Reader(source / 'ne_50m_admin_0_countries', encoding='utf-8')
    paths = {}
    limits = {}
    for record in data.iterShapeRecords():
        bounds = box(*record.shape.bbox)
        if not bounds.intersects(REGION):
            continue
        geometry = shape(record.shape.__geo_interface__).buffer(0).intersection(REGION)
        if geometry.area < .045:
            continue
        code = record.record['ADM0_A3']
        limits[code] = geometry
        paths[code] = polygon_path(geometry.simplify(.07, preserve_topology=True))
    return paths, limits


def place_positions(source, limits):
    data = shapefile.Reader(source / 'ne_50m_populated_places', encoding='utf-8')
    requested = TARGETS | HUBS
    for code, name in requested.items():
        records = [r for r in data.iterShapeRecords() if r.record['NAMEASCII'].casefold() == name.casefold()
                   and REGION.intersects(shape(r.shape.__geo_interface__))]
        if code != 'dubai':
            records = [r for r in records if limits[code].covers(shape(r.shape.__geo_interface__))]
        if len(records) != 1:
            raise ValueError(f'Expected one regional location for {name}, found {len(records)}')
        yield code, project(*records[0].shape.points[0])


def city_lights(source):
    data = shapefile.Reader(source / 'ne_50m_populated_places', encoding='utf-8')
    lights = []
    for record in data.iterShapeRecords():
        x, y = record.shape.points[0]
        if not REGION.covers(shape(record.shape.__geo_interface__)):
            continue
        if record.record['SCALERANK'] > 7:
            continue
        raster_x, raster_y = project(x, y)
        lights.append(f'M{raster_x:g},{raster_y:g}h.3')
    return ''.join(lights)


def build(source, output):
    paths, limits = countries(source)
    markers = dict(place_positions(source, limits))
    geometry = {'size': SIZE, 'countries': paths, 'markers': markers, 'lights': city_lights(source)}
    output.write_text(json.dumps(geometry, separators=(',', ':')), encoding='utf-8')


if __name__ == '__main__':
    build(Path(sys.argv[1]), Path(sys.argv[2]))
