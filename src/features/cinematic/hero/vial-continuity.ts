import { featherPlate, paintCap } from './draw-cap';
import { frame, neck, photoGeometry, type VialPose } from './photo-geometry';

const resting:VialPose={camera:0,turn:0,lift:0,light:0};
const cameraTravel=.05;

export function mountVialContinuity() {
  const art=document.querySelector<HTMLElement>('.hero-art');
  const stage=art?.querySelector<HTMLElement>('.hero-camera');
  const poster=stage?.querySelector<HTMLImageElement>('img');
  const canvas=stage?.querySelector<HTMLCanvasElement>('canvas');
  const context=canvas?.getContext('2d');
  if (!art||!stage||!poster||!canvas||!context) return {paint:()=>undefined,dispose:()=>undefined};
  return connect({art,stage,poster,canvas,context});
}

interface Layers {
  art:HTMLElement; stage:HTMLElement; poster:HTMLImageElement; canvas:HTMLCanvasElement; context:CanvasRenderingContext2D;
}

function align(stage:HTMLElement,canvas:HTMLCanvasElement,geometry:ReturnType<typeof photoGeometry>):void {
  canvas.style.left=geometry.x(frame.x)+'px';
  canvas.style.top=geometry.y(frame.y)+'px';
  canvas.style.width=frame.width*geometry.sx+'px';
  canvas.style.height=frame.height*geometry.sy+'px';
  stage.style.transformOrigin=geometry.x(neck.x)+'px '+geometry.y(neck.y)+'px';
}

function connect({art,stage,poster,canvas,context}:Layers) {
  const light=art.querySelector<HTMLElement>('.vial-light');
  const plate=new Image();
  let cleanPlate:HTMLCanvasElement|undefined;
  let pose=resting;
  const render=()=>{
    if (!poster.naturalWidth||!cleanPlate) return;
    paintCap(context,poster,cleanPlate,photoGeometry(poster,stage),pose);
  };
  const refresh=()=>{
    if (!poster.naturalWidth) return;
    align(stage,canvas,photoGeometry(poster,stage));
    render();
  };
  const unwatch=watchFrame(stage,poster,refresh);
  plate.onload=()=>{cleanPlate=loadCleanPlate(plate,art);refresh();};
  plate.src='/art/hero-neck.webp';
  return {
    paint:(next:VialPose)=>{
      const capChanged=next.turn!==pose.turn||next.lift!==pose.lift;
      pose={...next};
      paintScene(art,stage,light,pose);
      if(capChanged) render();
    },
    dispose:()=>{
      unwatch();
      plate.onload=null;
      resetScene(art,stage,light,context);
    },
  };
}

function loadCleanPlate(plate:HTMLImageElement,art:HTMLElement):HTMLCanvasElement {
  const cleanPlate=featherPlate(plate);
  art.dataset.vialReady='true';
  return cleanPlate;
}

function watchFrame(stage:HTMLElement,poster:HTMLImageElement,refresh:()=>void):()=>void {
  const observer=new ResizeObserver(refresh);
  observer.observe(stage);
  poster.addEventListener('load',refresh);
  return ()=>{
    observer.disconnect();
    poster.removeEventListener('load',refresh);
  };
}

function resetScene(art:HTMLElement,stage:HTMLElement,light:HTMLElement|null,context:CanvasRenderingContext2D):void {
  context.clearRect(0,0,frame.width,frame.height);
  stage.removeAttribute('style');
  light?.removeAttribute('style');
  delete art.dataset.vialReady;
  delete art.dataset.capLift;
  delete art.dataset.capTurn;
}

function paintScene(art:HTMLElement,stage:HTMLElement,light:HTMLElement|null,pose:VialPose):void {
  art.dataset.capLift=pose.lift.toFixed(3);
  art.dataset.capTurn=pose.turn.toFixed(3);
  stage.style.transform=pose.camera>0 ? `scale(${1+cameraTravel*pose.camera})` : '';
  if(light) light.style.opacity=String(pose.light*.83);
}
