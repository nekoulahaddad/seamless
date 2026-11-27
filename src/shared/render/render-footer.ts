import type { SiteProfile } from '../../../build/site-profile-schema';
import { escapeHtml as esc } from './escape-html';

export function renderFooter(profile:Pick<SiteProfile,'name'>,homeHref='/#hero'):string {
  const name=esc(profile.name);
  return `<footer class="cinematic-footer">
    <a class="footer-brand" href="${esc(homeHref)}">
      <svg viewBox="0 0 60 44" aria-hidden="true"><path d="M5 34C18 31 31 15 50 8C65 2 49 24 37 28M8 38C25 42 53 22 54 21C65 18 47 38 32 40"/></svg>
      <span>${name}</span>
    </a>
    <div class="footer-signoff">
      <small>© 2026 ${name}. All rights reserved.</small>
      <small class="dev-credit">Crafted with <span class="credit-heart">♡</span> by
        <a href="https://nmax.tech" target="_blank" rel="noopener noreferrer">NMAX</a></small>
    </div>
  </footer>`;
}
