import { escapeHtml } from '../src/shared/render/escape-html';
import type { PageRecord } from './page-schema';

export function renderDiscovery(pages: readonly PageRecord[], origin: string, isRelease: boolean): Readonly<Record<string,string>> {
  const urls = pages.map((page) => `<url><loc>${escapeHtml(new URL(page.path, origin).href)}</loc></url>`).join('');
  return {
    'robots.txt': isRelease ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n',
    'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${isRelease ? urls : ''}</urlset>`,
  };
}
