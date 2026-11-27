import { IGNITION, type Chapters, type Destination } from '../scroll/measure';

export const SVG='http://www.w3.org/2000/svg';
export interface Point { x:number; y:number }
interface Beat { point:Point; scroll:number; stage?:HTMLElement; horizontal?:boolean; finish?:boolean }
export interface JourneyGeometry { d:string; points:readonly Point[]; lengths:readonly number[]; thresholds:readonly number[]; stages:ReadonlyMap<number,HTMLElement> }
const desktopOrigin={x:.72,y:.2744};
const compactOrigin={x:.475,y:.2752};

function curve(a:Point,b:Point,lane:number,fromVial:boolean):string {
  const dy=b.y-a.y;
  if(fromVial){
    const height=a.y+dy*.71;
    return `C ${a.x} ${a.y+dy*.4}, ${a.x+18} ${height}, ${a.x-105} ${height}
      S ${lane} ${height}, ${lane} ${b.y-dy*.11} S ${b.x} ${b.y-7}, ${b.x} ${b.y}`;
  }
  return `C ${a.x} ${a.y+dy*.34}, ${lane} ${a.y+dy*.55}, ${lane} ${a.y+dy*.68}
    S ${b.x} ${b.y-dy*.11}, ${b.x} ${b.y}`;
}

function offsetInShot(element:Element|null):Point {
  const box=element?.getBoundingClientRect();
  const shot=element?.closest('.shot')?.getBoundingClientRect();
  if (!box||!shot) return {x:0,y:0};
  return {x:box.left+box.width/2,y:box.top-shot.top+box.height/2};
}

function heroAnchor(main:HTMLElement,compact:boolean):Point|undefined {
  const art=main.querySelector<HTMLElement>('.hero-art');
  const shot=art?.closest('.shot');
  if (!art||!shot) return undefined;
  const bounds=art.getBoundingClientRect();
  const origin=compact ? compactOrigin : desktopOrigin;
  return {x:bounds.left+bounds.width*origin.x,y:bounds.top-shot.getBoundingClientRect().top+bounds.height*origin.y};
}

function extraBeat({element,top,height}:Destination,bounds:Chapters,width:number,compact:boolean):Beat {
  const heading=element.querySelector('[data-journey-point], h2')?.getBoundingClientRect();
  const idealY=heading ? heading.top+scrollY+heading.height*.45 : top+height*.25;
  const y=idealY;
  const x=width*(compact ? .036 : .07);
  return {point:{x,y:y-bounds.mainTop},scroll:Math.max(top-innerHeight*.45,y-innerHeight*.62)};
}

function approachBeats({element,top}:Destination,bounds:Chapters,width:number,compact:boolean):Beat[] {
  const markers=Array.from(element.querySelectorAll<HTMLElement>('[data-stage-anchor]'));
  const beats=markers.flatMap((marker,index)=>{
    const stage=marker.closest<HTMLElement>('[data-stage]');
    if(!stage) return [];
    const {x,y}=marker.getBoundingClientRect();
    const position=y+scrollY;
    const scroll=compact ? position-innerHeight*.55 : top-innerHeight*(.57-index*.092);
    return [{point:{x,y:position-bounds.mainTop},scroll,stage,horizontal:!compact}];
  });
  const first=beats[0];
  if(compact||!first) return beats;
  const lead:Beat={point:{x:width*.046,y:first.point.y-28},scroll:top-innerHeight*.69};
  return [lead,...beats];
}

function horizontalWave(a:Point,b:Point,index:number):string {
  const length=b.x-a.x;
  const wave=index%2 ? 26 : -26;
  return `C ${a.x+length*.34} ${a.y+wave}, ${b.x-length*.29} ${b.y+wave}, ${b.x} ${b.y}`;
}

function sectionBeats(section:Destination,bounds:Chapters,width:number,compact:boolean):readonly Beat[] {
  if(section.element.id==='approach') return approachBeats(section,bounds,width,compact);
  const entry=extraBeat(section,bounds,width,compact);
  if(section.element.id!=='contact') return [entry];
  const controls=section.element.querySelector('.contact-status');
  if(!controls) return [entry];
  const {bottom}=controls.getBoundingClientRect();
  const clear=bottom+scrollY+24;
  return [entry,{point:{x:entry.point.x,y:clear-bounds.mainTop},scroll:clear-innerHeight*.58}];
}

function geometryBeats(main:HTMLElement,bounds:Chapters,width:number,compact:boolean):readonly Beat[] {
  const left=width*(compact ? .028 : .068);
  const anchor=heroAnchor(main,compact);
  const about=offsetInShot(main.querySelector('[data-anchor="about"]'));
  const expertiseAnchor=compact ? '[data-anchor="expertise"]' : '.branch-core';
  const services=offsetInShot(main.querySelector(expertiseAnchor));
  const expertiseX=compact ? left : services.x||left;
  const ignition=bounds.hero.top+bounds.hero.travel*IGNITION;
  const originX=anchor?.x??width*(compact ? .48 : .735);
  const originY=anchor?.y??innerHeight*.44;
  const later=bounds.destinations.flatMap((section)=>sectionBeats(section,bounds,width,compact));
  return [
    {point:{x:originX,y:ignition-bounds.mainTop+originY},scroll:ignition},
    {point:{x:left,y:bounds.about.top-bounds.mainTop+about.y},scroll:bounds.about.top},
    {point:{x:expertiseX,y:bounds.expertise.top-bounds.mainTop+services.y},scroll:bounds.expertise.top},
    ...later,
    {point:{x:width*(compact ? .54 : .82),y:main.offsetHeight-37},scroll:bounds.max,finish:true},
  ].sort((a,b)=>a.point.y-b.point.y);
}

function curveForBeat(a:Point,b:Point,beat:Beat|undefined,lane:number,index:number):string {
  if(beat?.finish){
    const dy=b.y-a.y;
    return `C ${lane} ${a.y+dy*.36}, ${lane} ${b.y}, ${b.x} ${b.y}`;
  }
  if(beat?.horizontal) return horizontalWave(a,b,index);
  return curve(a,b,lane,index===1);
}

export function buildGeometry(main:HTMLElement,bounds:Chapters,width:number,compact:boolean):JourneyGeometry {
  const beats=geometryBeats(main,bounds,width,compact);
  const points=beats.map(({point})=>point);
  const first=points[0];
  const stages=new Map<number,HTMLElement>();
  if (!first) return {d:'',points:[],lengths:[],thresholds:[],stages};
  const lane=width*(compact ? .022 : .045);
  const thresholds=beats.map(({scroll},index)=>Math.min(scroll,bounds.max-(beats.length-1-index)));
  for(let index=1;index<thresholds.length;index++){
    thresholds[index]=Math.max(thresholds[index]??0,(thresholds[index-1]??0)+1);
  }
  let d=`M ${first.x} ${first.y}`;
  const lengths=[0];
  const probe=document.createElementNS(SVG,'path');
  for(let index=1;index<points.length;index++){
    const a=points[index-1],b=points[index];
    if(!a||!b) continue;
    const beat=beats[index];
    if(beat?.stage) stages.set(index,beat.stage);
    const segment=curveForBeat(a,b,beat,lane,index);
    d+=` ${segment}`;
    probe.setAttribute('d',d);
    lengths.push(probe.getTotalLength());
  }
  return {d,points,lengths,thresholds,stages};
}
