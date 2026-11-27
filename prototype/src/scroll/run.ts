import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { liveModels } from './live-models';
import { createBranches } from '../path/branches';
import { createPath } from '../path/journey-path';
import { trackRemaining } from './remaining-scenes';
import { measure, progress, type Chapters } from './measure';
import { capsulePose, heroPose } from './poses';
import { mountVialContinuity } from '../hero/vial-continuity';
import { clearPaint, obtainLayers, paintAbout } from './paint-scenes';

export function runJourney(): ()=>void {
  const hero=document.querySelector<HTMLElement>('#hero'),about=document.querySelector<HTMLElement>('#about');
  const expertise=document.querySelector<HTMLElement>('#expertise'),main=document.querySelector<HTMLElement>('main');
  const svg=document.querySelector<SVGSVGElement>('.journey-path');
  if (!hero||!about||!expertise||!main||!svg) return ()=>undefined;
  document.documentElement.dataset.motion='on';
  gsap.registerPlugin(ScrollTrigger);
  const nodes={hero,about,expertise,main,svg};
  const painter=makePainter(nodes);
  const trigger=ScrollTrigger.create({start:0,end:'max',onUpdate:painter.render,onRefresh:painter.refresh});
  const onLoad=()=>painter.refresh();
  window.addEventListener('load',onLoad);
  const unwatch=watchLayout(main);
  painter.refresh();
  return ()=>{
    trigger.kill();
    unwatch();
    window.removeEventListener('load',onLoad);
    painter.dispose();
    delete document.documentElement.dataset.motion;
  };
}

interface JourneyNodes {hero:HTMLElement;about:HTMLElement;expertise:HTMLElement;main:HTMLElement;svg:SVGSVGElement}
function makePainter(nodes:JourneyNodes) {
  const {hero,about,expertise,main,svg}=nodes;
  const layers=obtainLayers(),models=liveModels(),vial=heroPose(),capsule=capsulePose();
  const heroArt=mountVialContinuity();
  const later=trackRemaining(main);
  const paint=(scroll:number,bounds:Chapters)=>{
    const first=progress(scroll,bounds.hero.top,bounds.hero.top+bounds.hero.travel);
    const second=progress(scroll,bounds.about.top,bounds.about.top+bounds.about.travel);
    updateModels(first,second,vial,capsule,models,layers,heroArt);
    later.paint(scroll);
    markCurrent(nodes,scroll,bounds);
  };
  const geometry=trackGeometry(nodes,paint,later.refresh);
  return {...geometry,dispose:()=>{
    geometry.dispose();
    later.dispose();
    models.dispose();
    heroArt.dispose();
    vial.dispose();
    capsule.dispose();
    clearPaint(layers);
  }};
}

function trackGeometry({hero,about,expertise,main,svg}:JourneyNodes,paint:(scroll:number,bounds:Chapters)=>void,
  onRefresh:()=>void) {
  let bounds:Chapters;
  let path:(scroll:number)=>void;
  let branches:(value:number)=>void;
  const render=()=>{
    if(!bounds) return;
    const scroll=window.scrollY;
    paint(scroll,bounds);
    path(scroll);
    branches(expertiseProgress(scroll,bounds));
  };
  const refresh=()=>{
    const compact=matchMedia('(max-width:900px)').matches;
    bounds=measure([hero,about,expertise],main);
    path=createPath(main,svg,bounds,compact);
    branches=createBranches(expertise,compact);
    onRefresh();
    render();
  };
  return {render,refresh,dispose:()=>branches?.(0)};
}

function watchLayout(main:HTMLElement):()=>void {
  let frame=0;
  const observer=new ResizeObserver(()=>{
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>ScrollTrigger.refresh());
  });
  observer.observe(main);
  return ()=>{observer.disconnect();cancelAnimationFrame(frame);};
}

function expertiseProgress(scroll:number,{expertise}:Chapters):number {
  const start=expertise.top-innerHeight*.35;
  const end=expertise.top+Math.max(expertise.travel,expertise.height-innerHeight*.4);
  return progress(scroll,start,end);
}

function updateModels(first:number,second:number,vial:ReturnType<typeof heroPose>,capsule:ReturnType<typeof capsulePose>,
  models:ReturnType<typeof liveModels>,layers:ReturnType<typeof obtainLayers>,heroArt:ReturnType<typeof mountVialContinuity>):void {
  const firstPose=vial.sample(first);
  const secondPose=capsule.sample(second);
  heroArt.paint(firstPose);
  paintAbout(layers,second,secondPose);
  models.update(first,second,secondPose);
}

function markCurrent(nodes:JourneyNodes,scroll:number,bounds:Chapters):void {
  nodes.hero.classList.toggle('proto-active',scroll<bounds.about.top);
  nodes.about.classList.toggle('proto-active',scroll>=bounds.about.top&&scroll<bounds.expertise.top);
  nodes.expertise.classList.toggle('proto-active',scroll>=bounds.expertise.top);
}
