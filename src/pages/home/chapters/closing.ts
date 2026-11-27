import { escapeHtml as esc } from '../../../shared/render/escape-html';
import { renderOrbit } from './orbit-art';

const differentiators=[
  ['Pharmaceutical specialization','M3 12h18l-2 5-4 3H9l-4-3zM11 12l6-9 3 2-5 7M9 16h6m-3-2v4'],
  ['Market-specific understanding across the Arab region','M12 14s4-4 4-7a4 4 0 1 0-8 0c0 3 4 7 4 7ZM12 7h.01M8 12l-3 1-3 8 7-2 6 2 7-2-3-7-3 1'],
  ['Regional business networks','M16 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM4 8a2 2 0 1 0 0 .05M20 8a2 2 0 1 0 0 .05M6 21v-2a6 6 0 0 1 12 0v2M2 19v-1a4 4 0 0 1 3-4m17 5v-1a4 4 0 0 0-3-4'],
  ['Registration and dossier readiness','M12 21H5V3h10l4 4v5M14 3v5h5M8 11h6m-6 4h3m10 3a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-6 0 1 1 2-2'],
  ['Entry strategies tailored to the portfolio','M3 21v-4h4v4Zm7 0v-7h4v7Zm7 0V10h4v11ZM3 13l6-5 5 2 7-7m-6 0h6v6'],
  ['Access to potential importers, distributors and manufacturers','M2 9l3-5 4 2-3 6zM22 9l-3-5-4 2 3 6zM8 7l4-2 4 2M7 11l-2 2 2 3 2-2m-2 2 2 2 2-2m-2 2 3 2 2-2M10 8l-1 3 2 1 3-2 5 4-1 2-3-2m3 2-2 2-3-2'],
  ['Relationship development for sustained market entry','M12 21v-8M12 16C5 17 3 13 3 8c7 0 9 4 9 8Zm0-4c0-7 3-9 9-9 0 6-3 9-9 9ZM6 22h12'],
] as const;

export function renderDifferentiators():string {
  const advantages=differentiators.map(([text,icon])=>`<li class="advantage-card">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon}"/></svg>
    <span>${esc(text)}</span></li>`).join('');
  return `<section id="why-work-with-us" class="chapter advantages-chapter" aria-labelledby="why-title">
    <header class="advantages-heading">
      <p class="scene-label">Why Work With Us</p><h2 id="why-title" data-journey-point>Why Work With Us</h2>
      <p class="description">Regional context for pharmaceutical decisions.</p>
    </header>
    ${renderOrbit()}
    <ul class="advantages-grid" role="list">${advantages}</ul>
  </section>`;
}
