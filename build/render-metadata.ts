import { escapeHtml as esc } from '../src/shared/render/escape-html';
import type { PageRecord } from './page-schema';
import type { SiteProfile } from './site-profile-schema';

export function renderMetadata(page: PageRecord, profile: SiteProfile, isRelease: boolean): string {
  const canonical = esc(new URL(page.path, profile.origin).href);
  const type = page.id === 'home' ? 'website' : 'article';
  const organization = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization',
    name: profile.name, url: profile.origin, logo: new URL(profile.logo, profile.origin).href }).replaceAll('<', '\\u003c');
  const schema = isRelease && page.id === 'home' ? `<script type="application/ld+json">${organization}</script>` : '';
  const robots = isRelease ? '' : '<meta name="robots" content="noindex, nofollow">';
  return `<title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}">
    <link rel="canonical" href="${canonical}"><meta property="og:type" content="${type}">
    <meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}">
    <meta property="og:url" content="${canonical}"><meta property="og:image" content="${esc(new URL(page.socialImage, profile.origin).href)}"> ${robots}${schema}`;
}
