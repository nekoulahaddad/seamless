import { expect, it } from 'vitest';
import { renderMetadata } from '../../../build/render-metadata';
import { renderStructuredData } from '../../../build/render-structured-data';
import { renderDiscovery } from '../../../build/render-discovery-files';
import { validateServices } from '../../../build/service-schema';
import { renderBrowserBrand } from '../../../src/shared/render/browser-brand';
import { fixtureProfile } from '../../../content/site-fixture';
import { homeSeo, socialCard } from '../../../content/seo';
import { serviceCatalog } from '../../../content/services/catalog';
import type { PageRecord } from '../../../build/page-schema';

const profile={...fixtureProfile,origin:'https://seamless.example',logo:'/brand/icon-512.png'};
const home:PageRecord={id:'home',locale:'en',direction:'ltr',path:'/',sections:[],socialImage:socialCard.path,...homeSeo};
const privacy={...home,id:'privacy',path:'/privacy/'};

it('renders absolute card and canonical URLs for the configured origin',()=>{
  const metadata=renderMetadata(privacy,profile,true);
  expect(metadata).toContain('rel="canonical" href="https://seamless.example/privacy/"');
  expect(metadata).toContain('name="twitter:image" content="https://seamless.example/brand/social-card.jpg"');
  expect(metadata).toContain('property="og:image:width" content="1200"');
  expect(metadata).toContain('property="og:image:height" content="630"');
  expect(metadata).toContain('name="twitter:image:alt"');
  expect(metadata).not.toContain('noindex');
  expect(renderMetadata(home,profile,false)).toContain('noindex, nofollow');
});

it('renders the organization, website, webpage, and six visible services without exposing the mailbox',()=>{
  const services=validateServices(serviceCatalog);
  const markup=renderStructuredData(home,profile,services);
  expect(markup.match(/"@type":"Service"/g)).toHaveLength(services.length);
  for(const type of ['Organization','WebSite','WebPage','ContactPoint']){
    expect(markup).toContain(`"@type":"${type}"`);
  }
  expect(markup).toContain('https://seamless.example/#contact');
  expect(markup).not.toMatch(/"email"|BreadcrumbList/);
  expect(renderStructuredData(privacy,profile,services)).not.toContain('"@type":"Service"');
});

it('escapes inline JSON-LD and maintains a non-indexable preview',()=>{
  const scripted={...home,title:'</script><script>alert(1)</script>'};
  expect(renderStructuredData(scripted,profile,[])).not.toContain('</script><script>');
  const preview=renderDiscovery([home],profile.origin,false);
  const release=renderDiscovery([home,privacy],profile.origin,true);
  expect(preview['robots.txt']).toContain('Disallow: /');
  expect(preview['sitemap.xml']).not.toContain('<loc>');
  expect(release['robots.txt']).toContain('Sitemap: https://seamless.example/sitemap.xml');
  expect(release['sitemap.xml']).toContain('<loc>https://seamless.example/privacy/</loc>');
});

it('links standard, PNG, and Apple icons plus the standalone identity manifest',()=>{
  const brand=renderBrowserBrand();
  for(const path of ['/favicon.ico','/brand/favicon-16.png','/brand/favicon-32.png','/brand/favicon-48.png',
    '/brand/apple-touch-icon.png','/brand/site.webmanifest']){
    expect(brand).toContain(path);
  }
});
