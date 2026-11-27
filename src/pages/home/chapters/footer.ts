import { fixtureProfile } from '../../../../content/site-fixture';
import { escapeHtml as esc } from '../../../shared/render/escape-html';
export interface FooterLinks {privacy:string|undefined;terms:string|undefined}

function documentLink(url:string|undefined,text:string):string {
  if(!url) return '';
  if(!url.endsWith('.pdf')) return `<a class="footer-document" href="${esc(url)}">${text}</a>`;
  return `<a class="footer-document" href="${esc(url)}" type="application/pdf">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 15v5h16v-5"/></svg>${text} (PDF)</a>`;
}

export function renderFooter(config:FooterLinks,year:number):string {
  return `<footer class="cinematic-footer">
    <a class="footer-brand" href="#hero">
      <svg viewBox="0 0 60 44" aria-hidden="true"><path d="M5 34C18 31 31 15 50 8C65 2 49 24 37 28M8 38C25 42 53 22 54 21C65 18 47 38 32 40"/></svg>
      <span>${esc(fixtureProfile.name)}</span>
    </a>
    ${documentLink(config.privacy,'Privacy Policy')}${documentLink(config.terms,'Terms &amp; Conditions')}
    <div class="footer-signoff">
      <small>© ${year} ${esc(fixtureProfile.name)}. All rights reserved.</small>
      <small class="dev-credit">Crafted with <span class="credit-heart">♡</span> by
        <a href="https://nmax.tech" target="_blank" rel="noopener noreferrer">NMAX</a></small>
    </div>
  </footer>`;
}
