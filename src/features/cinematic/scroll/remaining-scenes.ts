import { progress } from './measure';

export function trackRemaining(main:HTMLElement) {
  const contact=main.querySelector<HTMLElement>('#contact');
  const elements=[contact];
  let bounds=elements.map(measureScene);
  return {
    refresh:()=>{bounds=elements.map(measureScene);},
    paint:(scroll:number)=>{
      const [finale]=bounds;
      if(finale) finale.element.style.setProperty('--zoom',String(1+sceneProgress(finale,scroll)*.065));
    },
    dispose:()=>{
      for(const scene of bounds) scene?.element.removeAttribute('style');
    },
  };
}

interface Scene {element:HTMLElement;top:number;height:number}

function measureScene(element:HTMLElement|null):Scene|undefined {
  if(!element) return undefined;
  const {top,height}=element.getBoundingClientRect();
  return {element,top:top+scrollY,height};
}

function sceneProgress({top,height}:Scene,scroll:number):number {
  return progress(scroll,top-innerHeight*.71,top+height-innerHeight*.58);
}
