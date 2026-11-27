export const orbit={centerX:340,centerY:312,radiusX:254,radiusY:95,tilt:-.23,cycleMs:12000};
const turn=Math.PI*2;
const phases=[.04,.22,.37,.52,.68,.86] as const;

export function orbitPose(index:number,elapsed:number):{transform:string;isFront:boolean} {
  const angle=((phases[index]??0)+elapsed/orbit.cycleMs)*turn;
  const depth=Math.sin(angle);
  const x=orbit.radiusX*Math.cos(angle);
  const y=orbit.radiusY*depth;
  const cos=Math.cos(orbit.tilt);
  const sin=Math.sin(orbit.tilt);
  const scale=.89+depth*.15;
  const rotation=index*19-28+Math.sin(angle+.45)*22;
  return {
    transform:`translate(${orbit.centerX+x*cos-y*sin} ${orbit.centerY+x*sin+y*cos}) rotate(${rotation}) scale(${scale})`,
    isFront:depth>=0,
  };
}
