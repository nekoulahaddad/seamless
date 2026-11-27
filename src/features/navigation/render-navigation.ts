import type { SiteProfile } from '../../../build/site-profile-schema';
import { escapeHtml as esc } from '../../shared/render/escape-html';

const brand = (profile: SiteProfile) => `<img width="42" height="42" src="${esc(profile.logo)}" alt=""><span>${esc(profile.name)}</span>`;
export function renderNavigation(profile: SiteProfile, hasCases: boolean): string {
  const items = hasCases ? [...profile.navigation, { id: 'case-studies', label: 'Case Studies' }] : profile.navigation;
  return `<a class="skip cta" href="#main">Skip to content</a>
    <header class="site-header" id="header"><div class="site-bar">
      <a class="brand" href="/">${brand(profile)}</a>
      <button class="menu-button cta" type="button" aria-controls="site-links" aria-expanded="false" hidden>Menu</button>
      <nav id="site-links" aria-label="Primary">${items.map(({ id, label }) => `<a href="#${esc(id)}">${esc(label)}</a>`).join('')}</nav>
      <a class="cta primary header-contact" href="#contact">Book a Consultation</a>
    </div></header>`;
}
