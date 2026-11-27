import type { SiteProfile } from '../../../build/site-profile-schema';
import { escapeHtml as esc } from './escape-html';

export function renderFooter(profile: SiteProfile): string {
  return `<footer class="footer"><div class="inset"><div>
    <img src="${esc(profile.logo)}" width="42" height="42" alt="">
    <p><strong>${esc(profile.name)}</strong><br>Pharmaceutical market entry and business development.</p>
    <small>© ${esc(profile.name)}</small></div>
    <nav aria-label="Footer"><a href="/#expertise">Services</a><a href="/#contact">Contact</a>
    <a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a></nav></div></footer>`;
}
