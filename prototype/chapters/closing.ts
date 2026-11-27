import { fixtureProfile } from '../../content/site-fixture';
import { networkLocations } from '../../content/network/locations';
import { renderContact } from '../../src/features/contact/render-contact';
import { escapeHtml as esc } from '../../src/shared/render/escape-html';
import { picture } from './art';

const differentiators=[
  'Pharmaceutical specialization',
  'Market-specific understanding across the Arab region',
  'Regional business networks',
  'Registration and dossier readiness',
  'Entry strategies tailored to the portfolio',
  'Access to potential importers, distributors and manufacturers',
  'Relationship development for sustained market entry',
];

export function renderClosing():string {
  return `<section id="why-work-with-us" class="chapter editorial-chapter" aria-labelledby="why-title">
    <div class="chapter-grid"><div><h2 id="why-title" data-journey-point>Why Work With Us</h2>
    <p class="description">Regional context for pharmaceutical decisions.</p></div>
    <ul class="editorial-list">${differentiators.map((item)=>`<li>${esc(item)}</li>`).join('')}</ul></div>
  </section>
  <section id="partners" class="chapter network-chapter" aria-labelledby="network-title">
    ${picture('network')}
    <div class="network-copy"><h2 id="network-title" data-journey-point>Regional and Strategic Network</h2>
      <p class="description">Our network involves companies based in Dubai and Saudi Arabia.</p>
      <ul>${networkLocations.map(({name})=>`<li>${esc(name)}</li>`).join('')}</ul>
    </div>
  </section>
  <section id="finale" class="chapter finale-chapter" aria-labelledby="finale-title">
    ${picture('finale')}
    <div class="finale-copy"><h2 id="finale-title" data-journey-point>A clearer next step for your portfolio.</h2>
      <a class="button primary" href="#contact">Book a Consultation</a>
    </div>
  </section>
  ${renderContact(Buffer.from('team@seamless.example').toString('base64'),false)}`;
}

export function renderPreviewLegal():string {
  return `<div class="preview-policies"><details id="privacy"><summary>Preview privacy</summary><p>${esc(fixtureProfile.privacy)}</p></details>
    <details id="terms"><summary>Preview terms</summary><p>${esc(fixtureProfile.terms)}</p></details></div>`;
}
