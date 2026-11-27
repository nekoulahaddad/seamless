const ns='http://www.w3.org/2000/svg';
const camera={distance:6.9,fov:33*Math.PI/180};
const capsule={radius:.235,length:1.1};
export interface CapsulePose { lift:number; turn:number; scale:number; scan:number }

function createCapsule(): SVGSVGElement {
  const svg=document.createElementNS(ns,'svg');
  svg.setAttribute('width','100%');
  svg.setAttribute('height','100%');
  svg.setAttribute('aria-hidden','true');
  svg.innerHTML=`<defs>
    <linearGradient id="capsule-enamel" x2="0" y2="1">
      <stop stop-color="#aabecb"/><stop offset=".32" stop-color="#f7fbfe"/>
      <stop offset=".72" stop-color="#e0e9f0"/><stop offset="1" stop-color="#aebec8"/>
    </linearGradient>
    <linearGradient id="capsule-shell" x2="0" y2="1">
      <stop stop-color="#819eae"/><stop offset=".42" stop-color="#cbdde7"/>
      <stop offset="1" stop-color="#a2b5c2"/>
    </linearGradient>
    <radialGradient id="capsule-lustre">
      <stop stop-color="#f5ffff" stop-opacity=".65"/><stop offset="1" stop-color="#f5ffff" stop-opacity="0"/>
    </radialGradient>
  </defs><g><path fill="url(#capsule-shell)"/><path fill="url(#capsule-enamel)"/>
    <ellipse fill="url(#capsule-lustre)"/></g>`;
  return svg;
}

function project(pose:CapsulePose,height:number,width:number) {
  const tilt=.26+pose.lift*.58;
  const roll=-.14-pose.lift*.46;
  const x=-Math.cos(pose.turn)*Math.sin(roll);
  const y=Math.cos(tilt)*Math.cos(roll)-Math.sin(tilt)*Math.sin(pose.turn)*Math.sin(roll);
  const factor=height/(2*Math.tan(camera.fov/2)*camera.distance);
  const radius=capsule.radius*factor*pose.scale;
  const length=(capsule.length/2-capsule.radius)*Math.hypot(x,y)*factor*pose.scale;
  return {radius,length,x:width/2-pose.lift*.92*factor,y:height/2-pose.lift*.21*factor,
    angle:Math.atan2(-y,x)*180/Math.PI};
}

function paint(svg:SVGSVGElement,pose:CapsulePose,width:number,height:number):void {
  const {x,y,angle,length,radius}=project(pose,height,width);
  const group=svg.querySelector('g');
  const [shell,enamel]=svg.querySelectorAll('path');
  const highlight=svg.querySelector('ellipse');
  group?.setAttribute('transform',`translate(${x} ${y}) rotate(${angle})`);
  shell?.setAttribute('d',`M0 ${-radius}H${-length}a${radius} ${radius} 0 0 0 0 ${2*radius}H0Z`);
  enamel?.setAttribute('d',`M${-radius*.14} ${-radius}H${length}a${radius} ${radius} 0 0 1 0 ${2*radius}H${-radius*.14}Z`);
  highlight?.setAttribute('cx',String(length*.55));
  highlight?.setAttribute('cy',String(radius*-.35));
  highlight?.setAttribute('rx',String(radius*.57));
  highlight?.setAttribute('ry',String(radius*.32));
}

export function mountCapsule(host:HTMLElement):{update:(pose:CapsulePose)=>void;dispose:()=>void} {
  const svg=createCapsule();
  let pose:CapsulePose={lift:0,turn:0,scale:.49,scan:0};
  let width=host.clientWidth;
  let height=host.clientHeight;
  const observer=new ResizeObserver(()=>{
    width=host.clientWidth;
    height=host.clientHeight;
    paint(svg,pose,width,height);
  });
  host.replaceChildren(svg);
  observer.observe(host);
  return {
    update:(next)=>{pose={...next};paint(svg,pose,width,height);},
    dispose:()=>{observer.disconnect();svg.remove();},
  };
}
