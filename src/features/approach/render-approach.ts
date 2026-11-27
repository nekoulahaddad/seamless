import { stages } from '../../../content/scenes/stages';
import { escapeHtml as esc } from '../../shared/render/escape-html';
import { stageArt } from '../../../content/scenes/asset-manifest';

export function renderApproach(): string {
  const items = stages.map((stage,index) => `<li id="${stage.id}" data-stage="${stage.id}">
    <p class="kicker">${String(index+1).padStart(2,'0')} / ${esc(stage.name)}</p>
    <h3>${esc(stage.title)}</h3><p class="lead">${esc(stage.copy)}</p></li>`).join('');
  return `<section id="approach" class="section approach" data-scene="approach"><div class="inset">
    <p class="kicker">Our approach</p><h2>From molecule to market.</h2>
    <div class="journey"><div class="journey-art" aria-hidden="true">
    <img data-layer src="${stageArt}" alt="" width="1200" height="800" loading="lazy" decoding="async">
    <div class="journey-light" data-light></div>
    <span class="scene-indicator" data-scene-label>01 / Understand</span></div>
    <ol class="journey-stages">${items}</ol></div></div></section>`;
}
