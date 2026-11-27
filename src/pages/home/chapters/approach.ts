import { stages } from '../../../../content/scenes/stages';
import { escapeHtml as esc } from '../../../shared/render/escape-html';

export function renderApproach():string {
  const steps=stages.map(({id,name,copy},index)=>`<li id="stage-${id}" data-stage>
    <span class="stage-number" aria-hidden="true">${String(index+1).padStart(2,'0')}</span>
    <h3>${esc(name)}</h3><p>${esc(copy)}</p><span data-stage-anchor aria-hidden="true"></span>
  </li>`).join('');
  return `<section id="approach" class="chapter approach-chapter" aria-labelledby="approach-title">
    <div class="timeline-inner">
      <p class="scene-label">Market entry</p>
      <h2 id="approach-title">Our Approach</h2>
      <p class="description">A focused path from opportunity to market access.</p>
      <ol class="stage-list">${steps}</ol>
    </div>
    <div class="timeline-waves" aria-hidden="true"></div>
  </section>`;
}
