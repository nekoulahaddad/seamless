import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { serviceCatalog } from '../content/services/catalog';
import { sceneRecords } from '../content/scenes/scene-records';
import { validateScenes } from './scene-schema';
import { renderPrivacy } from '../src/pages/privacy/render-privacy';
import { renderTerms } from '../src/pages/terms/render-terms';
import { renderDisclosures } from '../src/features/contact/render-legal-disclosure';
import { cinematicSections, renderCinematicHome } from '../src/pages/home/render-cinematic-home';
import { previewAlias } from './cinematic-config';
import { renderShell } from '../src/shared/render/page-shell';
import { validateServices } from './service-schema';
import { loadSite } from './site-input';
import { encodeAlias, validateDisclosures } from './protected-contact';
import { outputFor, validateRoutes } from './routes';
import { renderMetadata } from './render-metadata';
import { renderStructuredData } from './render-structured-data';
import { homeSeo, legalSeo, socialCard } from '../content/seo';
import type { PageRecord } from './page-schema';

function launchRoutes(name: string): readonly PageRecord[] {
  const shared = { locale:'en',direction:'ltr',socialImage:socialCard.path };
  return validateRoutes([
    { ...shared,id:'home',path:'/',...homeSeo,sections:[...cinematicSections] },
    { ...shared,id:'privacy',path:'/privacy/',title:`Privacy Policy | ${name}`,description:legalSeo.privacy,sections:['main'] },
    { ...shared,id:'terms',path:'/terms/',title:`Terms of Use | ${name}`,description:legalSeo.terms,sections:['main'] },
  ]);
}

export function assemblePages(root: string, isRelease: boolean, env:NodeJS.ProcessEnv): readonly PageRecord[] {
  const input = loadSite(isRelease);
  const { profile } = input;
  validateScenes(sceneRecords(input.isArtworkApproved),isRelease);
  const entries = validateDisclosures(input);
  const services = validateServices(serviceCatalog);
  const pages = launchRoutes(profile.name);
  const alias=isRelease?input.alias:previewAlias(env);
  const encodedAlias=alias?encodeAlias(alias):undefined;
  for (const page of pages) {
    const disclosure = renderDisclosures(page.path,entries);
    const isHome = page.id === 'home';
    const schema = isRelease ? renderStructuredData(page,profile,services) : '';
    const head = renderMetadata(page,profile,isRelease)+schema;
    const path = resolve(root,outputFor(page.path));
    mkdirSync(dirname(path),{recursive:true});
    const html=isHome
      ? renderCinematicHome({head,encodedAlias,disclosure,services,entry:'../src/features/cinematic/main.ts'})
      : renderLegalPage(page,profile,head,disclosure);
    writeFileSync(path,html);
  }
  return pages;
}

function renderLegalPage(page:PageRecord,profile:ReturnType<typeof loadSite>['profile'],head:string,disclosure:string):string {
  const body=page.id==='privacy'?renderPrivacy(profile,disclosure):renderTerms(profile,disclosure);
  return renderShell({locale:page.locale,direction:page.direction,head,body});
}
