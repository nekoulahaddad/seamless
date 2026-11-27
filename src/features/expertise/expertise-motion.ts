import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function expertiseMotion(section: HTMLElement, isFull: boolean): () => void {
  const track = section.querySelector<HTMLElement>('.service-track');
  const windowElement = section.querySelector<HTMLElement>('.service-window');
  if (!isFull || !track || !windowElement) return () => undefined;
  const distance = () => Math.max(0,track.scrollWidth-windowElement.clientWidth);
  const tween = gsap.to(track, {x:()=>-distance(),ease:'none',scrollTrigger:{
    trigger:section, start:'top top+=85', end:()=>`+=${distance()}`, pin:true, scrub:true,
    invalidateOnRefresh:true, onUpdate:(trigger)=> {
      const progress = section.querySelector<HTMLElement>('[data-service-progress]');
      if (progress) progress.style.transform = `scaleX(${trigger.progress})`;
    },
  }});
  const focus = (event: FocusEvent) => {
    const item = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>('.service-panel') : null;
    const trigger = tween.scrollTrigger;
    if (!item || !trigger || distance() <= 0) return;
    const edge = item.offsetLeft-track.offsetLeft;
    const position = gsap.utils.clamp(0,1,edge / distance());
    trigger.scroll(trigger.start + (trigger.end-trigger.start)*position);
    ScrollTrigger.update();
  };
  track.addEventListener('focusin',focus);
  return () => {
    track.removeEventListener('focusin',focus);
    section.querySelector('[data-service-progress]')?.removeAttribute('style');
  };
}
