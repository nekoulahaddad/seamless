import type { CapsulePose } from '../model/capsule';

export function liveModels() {
  let disposed=false;
  let started=false;
  let currentCapsule:CapsulePose|undefined;
  let previousSecond=-1;
  let model:ReturnType<typeof import('../model/models')['mountModels']>|undefined;
  const update=(first:number,second:number,capsule:CapsulePose):void=>{
    currentCapsule={...capsule};
    if (model) {
      if(second!==previousSecond) model.capsule(capsule);
      previousSecond=second;
      return;
    }
    if (started||first<.055) return;
    started=true;
    void import('../model/models').then(({mountModels})=>{
      if (disposed) return;
      model=mountModels();
      if (currentCapsule) model.capsule(currentCapsule);
    }).catch(()=>{started=false;});
  };
  return {update,dispose:()=>{disposed=true;model?.dispose();}};
}
