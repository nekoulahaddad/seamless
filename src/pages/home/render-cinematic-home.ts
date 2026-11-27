import { readFileSync } from 'node:fs';
import { en } from '../../../content/locales/en';
import type { Service } from '../../../build/service-schema';
import { renderBrowserBrand } from '../../shared/render/browser-brand';
import { escapeHtml as esc } from '../../shared/render/escape-html';
import { renderApproach } from './chapters/approach';
import { renderDifferentiators } from './chapters/closing';
import { renderContact } from './chapters/contact';
import { renderFooter } from '../../shared/render/render-footer';
import { fixtureProfile } from '../../../content/site-fixture';
import { renderMarkets } from './chapters/markets';
import { mobileNavigation } from './chapters/mobile-navigation';

interface CinematicHome {
  head:string;
  entry:string;
  encodedAlias:string|undefined;
  disclosure:string;
  services:readonly Service[];
}

export const cinematicSections=['hero','about','expertise','approach','markets','why-work-with-us','contact'] as const;

const brand='<a class="brand" href="#hero" aria-label="Seamless Market Entry Advisory, beginning"><svg viewBox="0 0 60 44" aria-hidden="true"><path d="M5 34C18 31 31 15 50 8C65 2 49 24 37 28M8 38C25 42 53 22 54 21C65 18 47 38 32 40"/></svg><span>Seamless<br>Market Entry<br>Advisory</span></a>';

export function renderCinematicHome(input:CinematicHome):string {
  const template=readFileSync(new URL('./cinematic.html',import.meta.url),'utf8');
  const navigation=en.nav.map(({id,label})=>`<a href="#${id}">${esc(label)}</a>`).join('');
  const sections=renderApproach()+renderMarkets()+renderDifferentiators()+renderContact(input.encodedAlias,input.disclosure);
  return template.replace('<!-- page-head -->',()=>renderBrowserBrand()+input.head)
    .replace('<!-- page-entry -->',()=>input.entry)
    .replace('<!-- approved-headline -->',()=>esc(en.hero.replace('Emerging Arab Markets.',''))+'<em>Emerging Arab Markets.</em>')
    .replace('<!-- approved-support -->',()=>esc(en.support))
    .replace('<!-- prototype-nav -->',()=>navigation)
    .replace('<!-- mobile-nav -->',()=>mobileNavigation())
    .replace('<!-- header-brand -->',()=>brand)
    .replace('<!-- menu-brand -->',()=>brand)
    .replace('<!-- services -->',()=>renderServices(input.services))
    .replace('<!-- remaining-chapters -->',()=>sections)
    .replace('<!-- cinematic-footer -->',()=>renderFooter(fixtureProfile,'#hero'));
}

function renderServices(services:readonly Service[]):string {
  return services.map(({id,name,summary},index)=>
    `<li id="service-${esc(id)}" data-service="${index}"><h3>${esc(name)}</h3><p>${esc(summary)}</p></li>`).join('');
}
