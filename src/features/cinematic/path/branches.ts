import { SVG } from './path-geometry';

export function createBranches(section:HTMLElement,compact:boolean):(value:number)=>void {
  const svg=section.querySelector<SVGSVGElement>('.branch-map');
  const services=Array.from(section.querySelectorAll<HTMLElement>('[data-service]'));
  if(!svg) return ()=>undefined;
  const paths=compact ? [] : drawBranches(svg,services);
  svg.replaceChildren(...paths);
  return (value:number)=>{
    const active=Math.min(services.length-1,Math.floor(value*services.length));
    services.forEach((service,index)=>{
      const lit=value>=.015&&index<=active;
      paths[index]?.classList.toggle('is-lit',lit);
      service.classList.toggle('is-active',lit&&index===active);
    });
    section.dataset.litBranches=String(value>=.015?active+1:0);
  };
}

function drawBranches(svg:SVGSVGElement,services:readonly HTMLElement[]):SVGPathElement[] {
  const rect=svg.getBoundingClientRect();
  svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
  const start={x:rect.width*.18,y:rect.height*.53};
  return services.map((service)=>{
    const pos=service.getBoundingClientRect();
    const x=pos.left-rect.left-12;
    const y=pos.top+18-rect.top;
    const path=document.createElementNS(SVG,'path');
    path.setAttribute('d',`M${start.x} ${start.y} C${rect.width*.43} ${start.y} ${rect.width*.5} ${y} ${x} ${y}`);
    path.classList.add('branch-wire');
    return path;
  });
}
