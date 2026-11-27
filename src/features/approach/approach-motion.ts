import gsap from 'gsap';
import { bindStageIndicator } from './stage-indicator';

const camera = [
  {scale:1.08,xPercent:0,yPercent:-1},
  {scale:1.14,xPercent:-3,yPercent:0},
  {scale:1.19,xPercent:3,yPercent:2},
  {scale:1.13,xPercent:1,yPercent:-2},
  {scale:1,xPercent:0,yPercent:0},
] as const;

export function approachMotion(section: HTMLElement, isFull: boolean): () => void {
  const layer=section.querySelector('[data-layer]');
  const light=section.querySelector('[data-light]');
  const track=section.querySelector('.journey-stages');
  if (!layer||!track) return ()=>undefined;
  const sequence=gsap.timeline({scrollTrigger:{
    trigger:track,start:'top center',end:'bottom center',scrub:true,
  }});
  const amplitude=isFull?1:.38;
  for (const [index,cue] of camera.entries()) {
    sequence.to(layer,{scale:1+(cue.scale-1)*amplitude,xPercent:cue.xPercent*amplitude,
      yPercent:cue.yPercent*amplitude,duration:1,ease:'power1.inOut'},index);
    if (light) sequence.to(light,{opacity:.28+(index%3)*.17,duration:1,ease:'none'},index);
  }
  return bindStageIndicator(section);
}
