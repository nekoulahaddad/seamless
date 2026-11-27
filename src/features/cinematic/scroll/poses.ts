import gsap from 'gsap';
import type { CapsulePose } from '../model/capsule';
import type { VialPose } from '../hero/photo-geometry';

export function heroPose(): { sample: (value:number)=>VialPose; dispose:()=>void } {
  const pose:VialPose={camera:0,turn:0,lift:0,light:0};
  const sequence=gsap.timeline({paused:true,defaults:{ease:'sine.inOut'}});
  sequence.to(pose,{camera:1,duration:.89},0)
    .to(pose,{turn:Math.PI*2.25,duration:.42},.28)
    .to(pose,{lift:1,duration:.35},.4)
    .to(pose,{light:1,duration:.17},.6)
    .to(pose,{light:.63,duration:.23},.77);
  return {sample:(value)=>{ sequence.progress(value); return pose; },dispose:()=>sequence.kill()};
}

export function capsulePose(): { sample: (value:number)=>CapsulePose; dispose:()=>void } {
  const pose:CapsulePose={lift:0,turn:0,scale:.49,scan:0};
  const sequence=gsap.timeline({paused:true,defaults:{ease:'sine.inOut'}});
  sequence.to(pose,{lift:1,scale:1.02,duration:.47},.085)
    .to(pose,{turn:Math.PI*1.48,duration:.72},.23)
    .to(pose,{scan:1,duration:.43},.57);
  return {sample:(value)=>{sequence.progress(value);return pose;},dispose:()=>sequence.kill()};
}
