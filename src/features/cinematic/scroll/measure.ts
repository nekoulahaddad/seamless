export interface Bounds { top:number; height:number; travel:number }
export interface Destination { element:HTMLElement; top:number; height:number }
export interface Chapters {
  hero:Bounds; about:Bounds; expertise:Bounds; max:number; mainTop:number;
  destinations:readonly Destination[];
}
export const IGNITION=.66;

function measureChapter(root:HTMLElement):Bounds {
  const rect=root.getBoundingClientRect();
  const shot=root.querySelector('.shot')?.getBoundingClientRect();
  return {top:rect.top+scrollY,height:rect.height,travel:Math.max(rect.height-(shot?.height??innerHeight),1)};
}

export function measure([hero,about,expertise]:readonly [HTMLElement,HTMLElement,HTMLElement],main:HTMLElement):Chapters {
  const destinations=Array.from(main.querySelectorAll<HTMLElement>(':scope > section')).flatMap((element)=>{
    if(element===hero||element===about||element===expertise) return [];
    const {top,height}=element.getBoundingClientRect();
    return [{element,top:top+scrollY,height}];
  });
  return {hero:measureChapter(hero),about:measureChapter(about),expertise:measureChapter(expertise),
    max:Math.max(1,document.documentElement.scrollHeight-innerHeight),
    mainTop:main.getBoundingClientRect().top+scrollY,destinations};
}

export function progress(value:number,start:number,end:number):number {
  return Math.max(0,Math.min(1,(value-start)/Math.max(1,end-start)));
}
