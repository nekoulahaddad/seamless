import type { SiteProfile } from '../../../build/site-profile-schema';
import { escapeHtml as esc } from '../../shared/render/escape-html';

export function renderIntroduction(profile: SiteProfile): string {
  return `<section id="about" class="section intro"><div class="inset split">
    <div><p class="kicker">About Seamless</p><h2>Pharmaceutical market entry, with local context.</h2></div>
    <div><p class="lead">${esc(profile.mission)}</p><p>Our work brings together portfolio assessment, market intelligence, regulatory readiness and partnership development.</p></div>
  </div></section>`;
}
