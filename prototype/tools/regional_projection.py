import math
from dataclasses import dataclass

import numpy as np
from PIL import Image

NAVY = np.array((6, 22, 35), dtype=np.float32)
SKY = np.array((66, 160, 198), dtype=np.float32)


@dataclass(frozen=True)
class Camera:
    width: int
    height: int
    latitude: float
    radius: float
    center_y: float

    def position(self, lon, lat):
        angle, delta, view = map(math.radians, (lat, lon-29, self.latitude))
        x = math.cos(angle)*math.sin(delta)
        y = math.cos(view)*math.sin(angle)-math.sin(view)*math.cos(angle)*math.cos(delta)
        return (self.width/2+self.radius*x, self.center_y-self.radius*y)


def texture(filename):
    Image.MAX_IMAGE_PIXELS = 234_000_000
    with Image.open(filename) as image:
        image.draft('RGB',(11000,5500))
        w, h = image.size
        bounds = tuple(round(value) for value in (w*100/360, h*5/180, w*320/360, h*140/180))
        return np.asarray(image.crop(bounds).convert('RGB'))


def sample(pixels, lon, lat):
    h, w = pixels.shape[:2]
    x = np.clip((lon+80)/220*(w-1), 0, w-1)
    y = np.clip((85-lat)/135*(h-1), 0, h-1)
    i, j = x.astype(int), y.astype(int)
    nx, ny = np.minimum(i+1,w-1), np.minimum(j+1,h-1)
    fx, fy = (x-i)[...,None], (y-j)[...,None]
    return ((1-fx)*(1-fy)*pixels[j,i]+fx*(1-fy)*pixels[j,nx]
            +(1-fx)*fy*pixels[ny,i]+fx*fy*pixels[ny,nx])


def view_grid(camera, top, bottom):
    x = (np.arange(camera.width)[None,:]-camera.width/2)/camera.radius
    y = (camera.center_y-np.arange(top,bottom)[:,None])/camera.radius
    radial = np.sqrt(x*x+y*y)
    depth = np.sqrt(np.maximum(0,1-radial*radial))
    angle = math.radians(camera.latitude)
    lat = np.degrees(np.arcsin(np.clip(y*math.cos(angle)+depth*math.sin(angle),-1,1)))
    lon = 29+np.degrees(np.arctan2(x,depth*math.cos(angle)-y*math.sin(angle)))
    return lon, lat, radial


def grade(terrain, night, radial, width):
    relief = np.dot(terrain, np.array((.25,.6,.15)))/255
    ocean = np.clip((terrain[:,:,2]-terrain[:,:,0]+25)/155,0,1)
    relief *= 1-ocean*.7
    city = np.maximum(np.dot(night, np.array((.27,.57,.16)))-30,0)/225
    land_color = np.array((39,75,83))
    city_color = np.array((241,152,58))
    earth = NAVY+relief[...,None]*land_color+city[...,None]*city_color
    sky = np.exp(-abs(radial-1)*270)
    sunrise = np.exp(-((np.linspace(0,1,width)-.76)*7)**2)
    light = sky[...,None]*(SKY+sunrise[None,:,None]*np.array((100,61,22)))
    return np.where((radial<=1)[...,None],earth,NAVY)+light


def render_globe(camera, terrain, night):
    image = Image.new('RGB',(camera.width,camera.height))
    for top in range(0,camera.height,84):
        bottom = min(top+84,camera.height)
        lon,lat,radial = view_grid(camera,top,bottom)
        colors = grade(sample(terrain,lon,lat),sample(night,lon,lat),radial,camera.width)
        strip = Image.fromarray(np.uint8(np.clip(colors,0,255)))
        image.paste(strip,(0,top))
    return image
