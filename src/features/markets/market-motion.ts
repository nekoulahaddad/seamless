import gsap from 'gsap';
import { createLayerMotion } from '../approach/create-timeline';

export function marketMotion(section: HTMLElement, isFull: boolean): void {
  createLayerMotion(section,isFull);
  const nodes = section.querySelectorAll('[data-country]');
  if (!nodes.length) return;
  gsap.fromTo(nodes, {opacity:.52}, {opacity:1,stagger:.15,ease:'none',scrollTrigger:{
    trigger:section,start:'top 90%',end:'center center',scrub:true,
  }});
}
