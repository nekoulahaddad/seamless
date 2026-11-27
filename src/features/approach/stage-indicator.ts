import { stages } from '../../../content/scenes/stages';

export function bindStageIndicator(section: HTMLElement): () => void {
  const label=section.querySelector('[data-scene-label]');
  const nodes=Array.from(section.querySelectorAll<HTMLElement>('[data-stage]'));
  if (!label||!nodes.length) return ()=>undefined;
  let frame=0;
  const update=()=>{
    frame=0;
    const midpoint=innerHeight/2;
    const bounds=section.getBoundingClientRect();
    if (bounds.top>innerHeight||bounds.bottom<0) return;
    const index=nodes.reduce((current,node,i)=>node.getBoundingClientRect().top<=midpoint?i:current,0);
    const stage=stages[index];
    if (!stage||section.dataset.activeStage===stage.id) return;
    section.dataset.activeStage=stage.id;
    label.textContent=`${String(index+1).padStart(2,'0')} / ${stage.name}`;
  };
  const schedule=()=>{ if(!frame) frame=requestAnimationFrame(update); };
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  schedule();
  return ()=>{
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll',schedule);
    window.removeEventListener('resize',schedule);
    delete section.dataset.activeStage;
    label.textContent='01 / Understand';
  };
}
