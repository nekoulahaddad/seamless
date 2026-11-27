import { buildGeometry, SVG, type JourneyGeometry } from './path-geometry';
import { progress, type Chapters } from '../scroll/measure';

export function visibleLength(scroll:number,geometry:JourneyGeometry): number {
  let visible=0;
  for (let i=1;i<geometry.thresholds.length;i++) {
    const start=geometry.thresholds[i-1],end=geometry.thresholds[i];
    const offset=geometry.lengths[i-1],target=geometry.lengths[i];
    if (start===undefined||end===undefined||offset===undefined||target===undefined) continue;
    visible=offset+(target-offset)*progress(scroll,start,end);
    if (scroll<=end) break;
  }
  return visible;
}

export function createPath(main: HTMLElement, svg: SVGSVGElement, bounds: Chapters, compact: boolean) {
  const geometry=buildGeometry(main,bounds,main.clientWidth,compact);
  svg.setAttribute('viewBox',`0 0 ${main.clientWidth} ${main.offsetHeight}`);
  paintFinish(svg,bounds,main.offsetHeight);
  const paths=Array.from(svg.querySelectorAll('path'));
  const [bed,...illuminated]=paths;
  for (const path of paths) path.setAttribute('d',geometry.d);
  const total=bed?.getTotalLength()??0;
  const flare=svg.querySelector<SVGCircleElement>('.path-flare');
  const group=svg.querySelector('.path-nodes');
  const marks=geometry.points.map(({x,y})=> {
    const node=document.createElementNS(SVG,'circle');
    node.setAttribute('cx',String(x));node.setAttribute('cy',String(y));
    node.setAttribute('r',compact?'3':'4.5');
    return node;
  });
  group?.replaceChildren(...marks);
  illuminated.forEach((path)=>{path.style.strokeDasharray=`${total} ${total}`;});
  return (scroll:number)=>paintPath(scroll,geometry,illuminated,total,bed,flare,marks,svg);
}

function paintPath(scroll:number,geometry:JourneyGeometry,paths:SVGPathElement[],total:number,
  bed:SVGPathElement|undefined,flare:SVGCircleElement|null,marks:SVGCircleElement[],svg:SVGSVGElement):void {
  const length=visibleLength(scroll,geometry);
  const isLit=length>1;
  for (const path of paths) {
    path.style.visibility=isLit?'visible':'hidden';
    path.style.strokeDashoffset=String(Math.max(0,total-length));
  }
  if (bed&&flare) {
    const {x,y}=bed.getPointAtLength(length);
    flare.setAttribute('cx',String(x));flare.setAttribute('cy',String(y));
    flare.style.visibility=isLit?'visible':'hidden';
  }
  const active=geometry.thresholds.reduce((last,item,i)=>scroll>=item?i:last,-1);
  marks.forEach((node,i)=>{node.classList.toggle('lit',i<=active);node.classList.toggle('current',i===active);});
  updateStages(geometry,active);
  svg.dataset.litNodes=String(active+1);
  svg.dataset.visibleLength=String(Math.round(length));
}

function paintFinish(svg:SVGSVGElement,bounds:Chapters,height:number):void {
  const contact=bounds.destinations.find(({element})=>element.id==='contact');
  const gradient=svg.querySelector('#journey-finish');
  if(!contact||!gradient) return;
  gradient.setAttribute('x1','0');
  gradient.setAttribute('x2','0');
  gradient.setAttribute('y1',String(contact.top-bounds.mainTop));
  gradient.setAttribute('y2',String(height-32));
}

function updateStages({stages}:JourneyGeometry,active:number):void {
  const last=Array.from(stages.keys()).at(-1)??0;
  for(const [index,stage] of stages){
    stage.classList.toggle('is-reached',index<=active);
    stage.classList.toggle('is-current',index===Math.min(last,active));
  }
}
