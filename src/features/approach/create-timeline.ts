import gsap from 'gsap';

export function createLayerMotion(section: HTMLElement, isFull: boolean): void {
  const layer = section.querySelector('[data-layer]');
  if (!layer) return;
  const timeline = gsap.timeline({ scrollTrigger: {
    trigger:section, start:'top bottom', end:'bottom top', scrub:true,
  }});
  timeline.fromTo(layer, {scale:1, yPercent:0}, {scale:isFull ? 1.1 : 1.04, yPercent:isFull ? -4 : -2, ease:'none'});
  const light = section.querySelector('[data-light]');
  if (light) timeline.fromTo(light, {opacity:.2}, {opacity:.7, ease:'none'}, 0);
}
