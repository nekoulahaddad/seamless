import { escapeHtml as esc } from '../src/shared/render/escape-html';
import { socialCard } from '../content/seo';
import type { PageRecord } from './page-schema';
import type { SiteProfile } from './site-profile-schema';

export function renderMetadata(page:PageRecord,profile:SiteProfile,isRelease:boolean):string {
  const canonical=esc(new URL(page.path,profile.origin).href);
  const title=esc(page.title);
  const description=esc(page.description);
  const image=esc(new URL(page.socialImage,profile.origin).href);
  const alt=esc(socialCard.alt);
  const robots=isRelease ? 'index, follow, max-image-preview:large' : 'noindex, nofollow';
  return `<title>${title}</title><meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}"><meta name="robots" content="${robots}">
    <meta property="og:type" content="website"><meta property="og:site_name" content="${esc(profile.name)}">
    <meta property="og:locale" content="en_GB"><meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${title}"><meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}"><meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="${socialCard.width}"><meta property="og:image:height" content="${socialCard.height}">
    <meta property="og:image:alt" content="${alt}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}"><meta name="twitter:image:alt" content="${alt}">`;
}
