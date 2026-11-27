import { progress } from './measure';

const visualSections=['approach','markets','why-work-with-us','partners','finale'] as const;
type VisualId=(typeof visualSections)[number];
interface Visual { id:VisualId; element:HTMLElement; top:number; height:number }

export function trackRemaining(main:HTMLElement) {
  const stages=Array.from(main.querySelectorAll<HTMLElement>('[data-stage]'));
  const links=Array.from(main.querySelectorAll<HTMLAnchorElement>('.stage-rail a'));
  let positions:readonly number[]=[];
  let visuals:readonly Visual[]=[];
  let active=-1;
  const refresh=()=>{
    positions=stages.map((item)=>item.getBoundingClientRect().top+scrollY);
    visuals=visualSections.flatMap((id)=>{
      const element=main.querySelector<HTMLElement>('#'+id);
      if(!element) return [];
      const box=element.getBoundingClientRect();
      return [{element,id,top:box.top+scrollY,height:box.height}];
    });
  };
  return {refresh,paint:(scroll:number)=>{
    const next=positions.reduce((last,top,index)=>scroll+innerHeight*.52>=top ? index : last,-1);
    if(next!==active){active=next;markStage(stages,links,active);}
    visuals.forEach((visual)=>paintVisual(visual,scroll));
  },dispose:()=>{
    markStage(stages,links,-1);
    visuals.forEach(({element})=>element.removeAttribute('style'));
  }};
}

function markStage(stages:readonly HTMLElement[],links:readonly HTMLAnchorElement[],active:number):void {
  stages.forEach((stage,index)=>stage.classList.toggle('is-current',index===active));
  links.forEach((link,index)=>{
    if(index===active) link.setAttribute('aria-current','step');
    else link.removeAttribute('aria-current');
  });
}

function paintVisual({element,id,top,height}:Visual,scroll:number):void {
  const value=progress(scroll,top-innerHeight*.78,top+height-innerHeight*.22);
  const shifted=id==='approach' ? 14-value*28 : 0;
  if(id==='approach') paintApproachLight(element,value);
  if(id==='why-work-with-us'){
    element.style.setProperty('--editorial-progress',String(value));
    return;
  }
  element.style.setProperty('--camera-x',shifted+'px');
  element.style.setProperty('--camera-y',`${(1-value)*9}px`);
  element.style.setProperty('--zoom',String(1.05+value*(id==='finale'?.08:.04)));
}

function paintApproachLight(element:HTMLElement,value:number):void {
  element.style.setProperty('--camera-tilt',`${(value-.5)*5}deg`);
  element.style.setProperty('--reflection-x',`${20+value*64}%`);
  element.style.setProperty('--reflection-strength',String(.2+Math.sin(value*Math.PI)*.48));
}
