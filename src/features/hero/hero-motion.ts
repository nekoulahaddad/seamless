import gsap from 'gsap';

export function heroMotion(section: HTMLElement, isFull: boolean): void {
  const image = section.querySelector('[data-layer]');
  if (!image) return;
  const timeline = gsap.timeline({scrollTrigger:{
    trigger:section,start:'top top',end:'bottom top',scrub:true,
  }});
  timeline.to(image,{scale:isFull?1.18:1.08,yPercent:isFull?12:6,ease:'none'},0);
  const light = section.querySelector('[data-light]');
  const reflection = section.querySelector('[data-reflection]');
  if (light) timeline.to(light,{opacity:.85,scale:1.13,ease:'none'},0);
  if (reflection) timeline.to(reflection,{opacity:.65,yPercent:9,scaleX:1.14,ease:'none'},0);
}
