import { orbit, orbitPose } from '../../../features/cinematic/orbit/geometry';
import { orbitalPills, pillMaterials } from './orbit-pills';

function orbitRing():string {
  const {centerX:x,centerY:y,radiusX:rx,radiusY:ry}=orbit;
  const tilt=orbit.tilt*180/Math.PI;
  const track=`M${x-rx} ${y}a${rx} ${ry} 0 0 0 ${rx*2} 0`;
  return `<g transform="rotate(${tilt} ${x} ${y})">
    <ellipse class="orbit-halo" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>
    <ellipse class="orbit-line" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>
    <path class="orbit-sparks" d="${track}"/>
  </g>`;
}

export function renderOrbit():string {
  const objects=orbitalPills.map((shape,index)=>{
    const pose=orbitPose(index,0);
    return {isFront:pose.isFront,html:`<g data-orbit-object="${index}" transform="${pose.transform}">${shape}</g>`};
  });
  const layer=(isFront:boolean)=>objects.filter((item)=>item.isFront===isFront).map((item)=>item.html).join('');
  return `<div class="advantage-art" aria-hidden="true">
    <img class="advantage-atmosphere" src="/art/advantage-atmosphere.webp" width="900" height="900" alt="" loading="lazy" decoding="async">
    <svg class="vial-orbit" data-orbit viewBox="0 0 680 560" aria-hidden="true">
      <defs>${pillMaterials()}<linearGradient id="orbit-light"><stop stop-color="#ad7135"/><stop offset=".4" stop-color="#ffe3a7"/><stop offset=".67" stop-color="#dc8d38"/><stop offset=".92" stop-color="#fff1c5"/></linearGradient></defs>
      ${orbitRing()}
      <g data-orbit-rear>${layer(false)}</g>
      <foreignObject x="217" y="55" width="246" height="375">
        <img xmlns="http://www.w3.org/1999/xhtml" class="stationary-vial" src="/art/advantage-vial.webp" width="246" height="375" alt="" loading="lazy" decoding="async">
      </foreignObject>
      <path class="orbit-line orbit-front-light" d="M86 312a254 95 0 0 0 508 0" transform="rotate(-13.18 340 312)"/>
      <g data-orbit-front>${layer(true)}</g>
    </svg></div>`;
}
