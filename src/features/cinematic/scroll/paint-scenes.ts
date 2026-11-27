import type { CapsulePose } from '../model/capsule';
import { progress } from './measure';

interface Surroundings {
  expert?:HTMLElement; scan?:HTMLElement; beam?:HTMLElement; capsule?:HTMLElement;
}

export function obtainLayers(): Surroundings {
  const find=(selector:string)=>document.querySelector<HTMLElement>(selector)??undefined;
  return Object.fromEntries(Object.entries({
    expert:find('.expert-still'),scan:find('.scan-display'),beam:find('.scan-beam'),capsule:find('.capsule-fallback'),
  }).filter(([,element])=>element));
}

export function paintAbout(layers: Surroundings,value:number,pose:CapsulePose):void {
  if (layers.expert) {
    layers.expert.style.transform=`scale(${1+value*.095})`;
    layers.expert.style.filter=`brightness(${1-value*.22})`;
  }
  if(layers.capsule) layers.capsule.style.transform=`translate(${-39*pose.lift}px,${-18*pose.lift}px) rotate(${-value*42}deg) scale(${1+pose.lift*.54})`;
  const emphasis=progress(value,.49,.72);
  if (layers.scan) layers.scan.style.opacity=String(emphasis*.73);
  if (layers.beam) {
    layers.beam.style.opacity=String(Math.sin(pose.scan*Math.PI)*.79);
    layers.beam.style.transform=`translateY(calc(var(--pinch-length) * ${pose.scan*1.8}))`;
  }
}

export function clearPaint(layers: Surroundings):void {
  for (const layer of Object.values(layers)) layer?.removeAttribute('style');
}
