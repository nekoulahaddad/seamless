import { escapeHtml as esc } from '../../../shared/render/escape-html';

const differentiators=[
  'Pharmaceutical specialization',
  'Market-specific understanding across the Arab region',
  'Regional business networks',
  'Registration and dossier readiness',
  'Entry strategies tailored to the portfolio',
  'Access to potential importers, distributors and manufacturers',
  'Relationship development for sustained market entry',
];

export function renderDifferentiators():string {
  return `<section id="why-work-with-us" class="chapter editorial-chapter" aria-labelledby="why-title">
    <div class="chapter-grid"><div><h2 id="why-title" data-journey-point>Why Work With Us</h2>
    <p class="description">Regional context for pharmaceutical decisions.</p></div>
    <ul class="editorial-list">${differentiators.map((item)=>`<li>${esc(item)}</li>`).join('')}</ul></div>
  </section>`;
}
