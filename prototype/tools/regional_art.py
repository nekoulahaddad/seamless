import json
import math
import sys
from pathlib import Path

import numpy as np
import shapefile
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from shapely.geometry import Point, shape

from regional_projection import Camera, NAVY, render_globe, texture

LABELS = {'TUN': 'Tunisia', 'LBY': 'Libya', 'SYR': 'Syria', 'IRQ': 'Iraq',
          'YEM': 'Yemen', 'SAU': 'Saudi Arabia', 'dubai': 'Dubai, UAE'}
TARGETS = tuple(LABELS)[:5]
ROUTES = (('TUN','SAU'),('LBY','dubai'),('SYR','dubai'),('IRQ','SAU'),('YEM','SAU'))
DESKTOP = Camera(3840,1860,-25,3560,3850)
MOBILE = Camera(1280,1000,-15,1160,1230)
LABEL_SIDE = {'TUN':'nw','LBY':'sw','SYR':'nw','IRQ':'ne','YEM':'se','SAU':'sw','dubai':'nw'}


def read_geography(source, projected):
    reader = shapefile.Reader(source/'ne_50m_admin_0_countries', encoding='utf-8')
    wanted = set(TARGETS)|{'SAU','ARE'}
    outlines = {row.record['ADM0_A3']: shape(row.shape.__geo_interface__)
                for row in reader.iterShapeRecords() if row.record['ADM0_A3'] in wanted}
    positions = {code: (x*58/1170+1,46-y*36/690) for code,(x,y) in projected['markers'].items()}
    interior = outlines['LBY'].representative_point()
    positions['LBY'] = (interior.x,interior.y)
    assert all(outlines['ARE' if code=='dubai' else code].covers(Point(*point))
               for code,point in positions.items())
    return outlines,positions


def paint_boundaries(image,camera,outlines):
    layer = Image.new('RGBA',image.size)
    draw = ImageDraw.Draw(layer)
    width = max(2,round(camera.width/850))
    for code in TARGETS:
        area = outlines[code].simplify(.023,preserve_topology=True)
        polygons = (area,) if area.geom_type=='Polygon' else area.geoms
        for polygon in polygons:
            exterior = [camera.position(x,y) for x,y in polygon.exterior.coords]
            draw.polygon(exterior,fill=(25,201,216,41))
            draw.line(exterior,fill=(101,225,237,150),width=width,joint='curve')
    return Image.alpha_composite(image,layer)


def curve(start,end,width):
    x,y = start
    tx,ty = end
    lift = 13 + width*.038 + abs(x-tx)*.114
    points = []
    for i in range(161):
        u = i/160
        v = 1-u
        points.append((x+(tx-x)*u,v*v*y+2*v*u*(min(y,ty)-lift)+u*u*ty))
    return points


def paint_routes(image,positions):
    layer = Image.new('RGBA',image.size)
    draw = ImageDraw.Draw(layer)
    width = max(2,round(image.width/660))
    for start,end in ROUTES:
        draw.line(curve(positions[start],positions[end],image.width),
                  fill=(255,210,132,219),width=width)
    softened = layer.filter(ImageFilter.GaussianBlur(width*1.7))
    return Image.alpha_composite(Image.alpha_composite(image,softened),layer)


def add_marks(image,positions,font_path):
    labels = Image.new('RGBA',image.size)
    draw = ImageDraw.Draw(labels)
    radius = max(6,round(image.width/290))
    size = 47 if image.width<2000 else 67
    font = ImageFont.truetype(str(font_path),size)
    for code,(x,y) in positions.items():
        color = (174,250,251) if code in TARGETS else (255,219,144)
        if code not in TARGETS:
            ring = radius*1.9
            draw.ellipse((x-ring,y-ring,x+ring,y+ring),outline=(*color,165),width=3)
        draw.ellipse((x-radius,y-radius,x+radius,y+radius),fill=(*color,255))
        vertical,horizontal = LABEL_SIDE[code]
        offset = radius*1.8
        left = x-offset if horizontal=='w' else x+offset
        top = y-(radius+size*.65) if vertical=='n' else y+radius+size*.35
        anchor = 'rm' if horizontal=='w' else 'lm'
        draw.text((left,top),LABELS[code],font=font,fill='#ffeed1' if code not in TARGETS else '#f7fdff',
                  stroke_width=max(2,size//16),stroke_fill='#081b29',anchor=anchor)
    return Image.alpha_composite(Image.alpha_composite(image,labels.filter(ImageFilter.GaussianBlur(radius*.82))),labels)


def feather(image):
    w,h = image.size
    pos = np.linspace(0,1,h)
    coverage = np.minimum(np.clip(pos/.17,0,1),np.clip((1-pos)/.10,0,1))
    alpha = Image.fromarray(np.uint8(255*(coverage**1.18))).resize((w,h))
    return Image.composite(image.convert('RGB'),Image.new('RGB',(w,h),tuple(map(int,NAVY))),alpha)


def compose(camera,terrain,night,outlines,locations,font):
    globe = render_globe(camera,terrain,night).convert('RGBA')
    coordinates = {code:camera.position(*location) for code,location in locations.items()}
    boundaries = paint_boundaries(globe,camera,outlines)
    routes = paint_routes(boundaries,coordinates)
    return feather(add_marks(routes,coordinates,font))


def build(source, output, font):
    projected = json.loads((Path(__file__).parents[2]/'content/markets/region-geometry.json').read_text())
    outlines, locations = read_geography(source,projected)
    terrain,night = (texture(source/file) for file in ('terrain.jpg','night.jpg'))
    for camera,name,quality in [(DESKTOP,'regional-wide',84),(MOBILE,'regional-compact',86)]:
        image = compose(camera,terrain,night,outlines,locations,font)
        image.save(output/f'{name}.webp',quality=quality,method=6)
        if camera==DESKTOP:
            image.resize((1920,930),Image.Resampling.LANCZOS).save(output/'regional-desktop.webp',quality=86,method=6)


if __name__ == '__main__':
    build(*map(Path,sys.argv[1:]))
