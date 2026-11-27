import { orbit, orbitPose } from './geometry';

export function activateOrbit():void {
  const artwork=document.querySelector<SVGSVGElement>('[data-orbit]');
  const rear=artwork?.querySelector('[data-orbit-rear]');
  const front=artwork?.querySelector('[data-orbit-front]');
  if(!artwork||!rear||!front) return;
  const objects=Array.from(artwork.querySelectorAll<SVGGElement>('[data-orbit-object]'));
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const animator=animateVisible(artwork,reduce,(elapsed)=>paintOrbit(objects,rear,front,elapsed));
  const observer=new IntersectionObserver(([entry])=>{
    animator.setVisible(entry?.isIntersecting??false);
  });
  observer.observe(artwork);
  document.addEventListener('visibilitychange',animator.sync);
  reduce.addEventListener('change',animator.sync);
}

function paintOrbit(objects:readonly SVGGElement[],rear:Element,front:Element,elapsed:number):void {
  for(const object of objects){
    const index=Number(object.dataset.orbitObject);
    const pose=orbitPose(index,elapsed);
    const layer=pose.isFront?front:rear;
    if(object.parentElement!==layer) layer.append(object);
    object.setAttribute('transform',pose.transform);
  }
}

function animateVisible(artwork:SVGSVGElement,reduce:MediaQueryList,paint:(elapsed:number)=>void) {
  let isVisible=false;
  let frame=0;
  let elapsed=0;
  let previous:number|undefined;
  const tick=(time:number)=>{
    if(previous!==undefined) elapsed=(elapsed+time-previous)%orbit.cycleMs;
    previous=time;
    paint(elapsed);
    frame=requestAnimationFrame(tick);
  };
  const sync=()=>{
    const isPlaying=isVisible&&!reduce.matches&&!document.hidden;
    artwork.dataset.orbitState=isPlaying?'running':'paused';
    if(isPlaying){
      if(!frame) frame=requestAnimationFrame(tick);
      return;
    }
    cancelAnimationFrame(frame);
    frame=0;
    previous=undefined;
  };
  return {setVisible:(value:boolean)=>{isVisible=value;sync();},sync};
}
