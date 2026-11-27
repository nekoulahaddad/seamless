import { stages } from '../../content/scenes/stages';
import { escapeHtml as esc } from '../../src/shared/render/escape-html';
import { picture } from './art';

export function renderApproach(): string {
  const steps=stages.map(({id,name,title,copy})=>`<li id="stage-${id}" data-stage>
    <p class="eyebrow">${esc(name)}</p><h3>${esc(title)}</h3><p>${esc(copy)}</p></li>`).join('');
  const links=stages.map(({id,name})=>`<a href="#stage-${id}">${esc(name)}</a>`).join('');
  return `<section id="approach" class="chapter approach-chapter" aria-labelledby="approach-title">
    <div class="chapter-grid">
      <div class="approach-visual">
        <h2 id="approach-title" data-journey-point>Our Approach</h2>
        ${picture('approach')}
        <nav class="stage-rail" aria-label="Approach stages">${links}</nav>
      </div>
      <ol class="stage-list">${steps}</ol>
    </div></section>`;
}
