export interface VialPose { camera:number; turn:number; lift:number; light:number }

export const frame = {x:1078,y:145,width:202,height:246};
export const plate = {x:1083,y:269,width:192,height:116};
export const neck = {x:1178,y:355};
const desktop = {x:0,y:0,width:1672,height:941,align:.5};
const phone = {x:680,y:94,width:955,height:734,align:.51};

export function photoGeometry(poster:HTMLImageElement,stage:HTMLElement) {
  const crop=poster.naturalWidth===820 ? phone : desktop;
  const sx=poster.naturalWidth/crop.width;
  const sy=poster.naturalHeight/crop.height;
  const fit=Math.max(stage.clientWidth/poster.naturalWidth,stage.clientHeight/poster.naturalHeight);
  const left=(stage.clientWidth-poster.naturalWidth*fit)/2;
  const top=(stage.clientHeight-poster.naturalHeight*fit)*crop.align;
  return {
    sourceX:(x:number)=>(x-crop.x)*sx,
    sourceY:(y:number)=>(y-crop.y)*sy,
    x:(x:number)=>left+(x-crop.x)*sx*fit,
    y:(y:number)=>top+(y-crop.y)*sy*fit,
    sx:sx*fit,sy:sy*fit,
  };
}
