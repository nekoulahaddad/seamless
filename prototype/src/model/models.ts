import { mountCapsule, type CapsulePose } from './capsule';

type Mounted<Pose> = {update: (pose: Pose) => void; dispose: () => void};
interface Models {
  capsule: (pose: CapsulePose) => void;
  dispose: () => void;
}

function attempt<Pose>(name: string, create: (target: HTMLElement) => Mounted<Pose>): Mounted<Pose> | undefined {
  const target=document.querySelector<HTMLElement>(`[data-model="${name}"]`);
  if (!target?.parentElement) return undefined;
  const container=target.parentElement;
  try {
    const window=create(target);
    container.dataset.live=name;
    return {update:window.update,dispose:()=>{ window.dispose();delete container.dataset.live; }};
  } catch {
    return undefined;
  }
}

export function mountModels(): Models {
  let capsule:Mounted<CapsulePose>|undefined;
  let triedCapsule=false;
  return {
    capsule:(pose)=>{
      if (!triedCapsule && pose.lift>0) {
        triedCapsule=true;
        capsule=attempt('capsule',mountCapsule);
      }
      capsule?.update(pose);
    },
    dispose:()=>{capsule?.dispose();},
  };
}
