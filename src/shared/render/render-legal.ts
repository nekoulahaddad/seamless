import { escapeHtml as esc } from './escape-html';
import { renderFooter } from './render-footer';
import type { SiteProfile } from '../../../build/site-profile-schema';

export function renderLegal(title: string, content: string, profile: SiteProfile, disclosure: string): string {
  return `<main id="main" class="legal"><a href="/">Seamless homepage</a><h1>${esc(title)}</h1>
    ${content.split(/\r?\n\r?\n/).map((part) => `<p>${esc(part)}</p>`).join('')}</main>
    ${disclosure}${renderFooter(profile)}`;
}
