import gsap from 'gsap';

export function differentiatorsMotion(section: HTMLElement): void {
  gsap.fromTo(section.querySelectorAll('li'), {y:13}, {y:0,stagger:.05,ease:'none',scrollTrigger:{
    trigger:section,start:'top bottom',end:'center center',scrub:true,
  }});
}
