import { SVG } from './path-geometry';

export function createBranches(section: HTMLElement, compact: boolean): (value:number)=>void {
  const svg=section.querySelector<SVGSVGElement>('.branch-map');
  const services=Array.from(section.querySelectorAll<HTMLElement>('[data-service]'));
  if (!svg) return ()=>undefined;
  const rect=svg.getBoundingClientRect();
  svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
  const start={x:rect.width*.18,y:rect.height*.53};
  const branches=services.map((service,index)=> {
    const pos=service.getBoundingClientRect();
    const x=compact?rect.width*.88:pos.left-rect.left-12;
    const y=compact?(index+1)*rect.height/7:pos.top+18-rect.top;
    const path=document.createElementNS(SVG,'path');
    path.setAttribute('d',`M${start.x} ${start.y} C${rect.width*.43} ${start.y} ${rect.width*.5} ${y} ${x} ${y}`);
    path.classList.add('branch-wire');
    return {path,service};
  });
  svg.replaceChildren(...branches.map(({path})=>path));
  return (value:number)=>{
    const active=Math.min(branches.length-1,Math.floor(value*branches.length));
    branches.forEach(({path,service},index)=>{
      const lit=value>=.015 && index<=active;
      path.classList.toggle('is-lit',lit);
      service.classList.toggle('is-active',lit&&index===active);
    });
    section.dataset.litBranches=String(value>=.015?active+1:0);
  };
}
