import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { serviceCatalog } from '../content/services/catalog';
import { marketCatalog } from '../content/markets/catalog';
import { networkLocations } from '../content/network/locations';
import { optionalCredibility, evidenceRecords } from '../content/credibility/catalog';
import { sceneRecords } from '../content/scenes/scene-records';
import { validateScenes } from './scene-schema';
import { homeSectionOrder } from '../src/pages/home/render-discovery';
import { renderHome } from '../src/pages/home/render-home';
import { renderPrivacy } from '../src/pages/privacy/render-privacy';
import { renderTerms } from '../src/pages/terms/render-terms';
import { renderDisclosures } from '../src/features/contact/render-legal-disclosure';
import { renderShell } from '../src/shared/render/page-shell';
import { validateServices } from './service-schema';
import { validateGeography } from './geography-schema';
import { validateCredibility } from './credibility-schema';
import { loadSite } from './site-input';
import { encodeAlias, validateDisclosures } from './protected-contact';
import { outputFor, validateRoutes } from './routes';
import { renderMetadata } from './render-metadata';
import type { PageRecord } from './page-schema';

function launchRoutes(name: string, description: string): readonly PageRecord[] {
  const shared = { locale:'en',direction:'ltr',description,socialImage:'/scenes/hero-dome.webp' };
  return validateRoutes([
    { ...shared,id:'home',path:'/',title:name,sections:[...homeSectionOrder] },
    { ...shared,id:'privacy',path:'/privacy/',title:`Privacy Policy | ${name}`,sections:['main'] },
    { ...shared,id:'terms',path:'/terms/',title:`Terms of Use | ${name}`,sections:['main'] },
  ]);
}

export function assemblePages(root: string, isRelease: boolean): readonly PageRecord[] {
  const input = loadSite(isRelease);
  const { profile } = input;
  validateScenes(sceneRecords(input.isArtworkApproved),isRelease);
  const entries = validateDisclosures(input);
  const services = validateServices(serviceCatalog);
  const { markets, locations } = validateGeography(marketCatalog, networkLocations, services);
  const credibility = validateCredibility(optionalCredibility, evidenceRecords);
  const pages = launchRoutes(profile.name, profile.positioning);
  const encodedContact = encodeAlias(input.alias);
  for (const page of pages) {
    const disclosure = renderDisclosures(page.path,entries);
    const isHome = page.id === 'home';
    const home = () => renderHome({profile,services,markets,locations,credibility,encodedContact,disclosure,isRelease});
    const legal = () => page.id === 'privacy' ? renderPrivacy(profile,disclosure) : renderTerms(profile,disclosure);
    const body = isHome ? home() : legal();
    const head = renderMetadata(page,profile,isRelease);
    const path = resolve(root,outputFor(page.path));
    mkdirSync(dirname(path),{recursive:true});
    writeFileSync(path,renderShell({locale:page.locale,direction:page.direction,head,body,isHome}));
  }
  return pages;
}
