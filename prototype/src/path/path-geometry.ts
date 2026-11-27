import { IGNITION, type Chapters, type Destination } from '../scroll/measure';

export const SVG='http://www.w3.org/2000/svg';
export interface Point { x:number; y:number }
interface Beat { point:Point; scroll:number }
export interface JourneyGeometry { d:string; points:readonly Point[]; lengths:readonly number[]; thresholds:readonly number[] }
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
  const y=element.id==='approach' ? top+Math.min(height*.13,innerHeight*.4) : idealY;
  const isScenic=element.id==='partners'||element.id==='finale';
  const x=width*(compact ? .036 : .07);
  return {point:{x:isScenic&&!compact?width*.935:x,y:y-bounds.mainTop},scroll:Math.max(top-innerHeight*.45,y-innerHeight*.62)};
}

function geometryBeats(main:HTMLElement,bounds:Chapters,width:number,compact:boolean):readonly Beat[] {
  const left=width*(compact ? .028 : .068);
  const anchor=heroAnchor(main,compact);
  const about=offsetInShot(main.querySelector('[data-anchor="about"]'));
  const services=offsetInShot(main.querySelector('.branch-core'));
  const ignition=bounds.hero.top+bounds.hero.travel*IGNITION;
  const originX=anchor?.x??width*(compact ? .48 : .735);
  const originY=anchor?.y??innerHeight*.44;
  const later=bounds.destinations.map((section)=>extraBeat(section,bounds,width,compact));
  return [
    {point:{x:originX,y:ignition-bounds.mainTop+originY},scroll:ignition},
    {point:{x:left,y:bounds.about.top-bounds.mainTop+about.y},scroll:bounds.about.top},
    {point:{x:services.x||left,y:bounds.expertise.top-bounds.mainTop+services.y},scroll:bounds.expertise.top},
    ...later,
    {point:{x:left,y:main.offsetHeight-32},scroll:bounds.max},
  ].sort((a,b)=>a.point.y-b.point.y);
}

export function buildGeometry(main:HTMLElement,bounds:Chapters,width:number,compact:boolean):JourneyGeometry {
  const beats=geometryBeats(main,bounds,width,compact);
  const points=beats.map(({point})=>point);
  const first=points[0];
  if (!first) return {d:'',points:[],lengths:[],thresholds:[]};
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
    d+=` ${curve(a,b,lane,index===1)}`;
    probe.setAttribute('d',d);
    lengths.push(probe.getTotalLength());
  }
  return {d,points,lengths,thresholds};
}
