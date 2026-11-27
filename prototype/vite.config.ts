import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { en } from '../content/locales/en';
import { serviceCatalog } from '../content/services/catalog';
import { escapeHtml as esc } from '../src/shared/render/escape-html';
import { renderApproach } from './chapters/approach';
import { renderDifferentiators } from './chapters/closing';
import { closingConfig } from './chapters/closing-config';
import { renderContact } from './chapters/contact';
import { renderFooter } from './chapters/footer';
import { renderMarkets } from './chapters/markets';
import { mobileNavigation } from './chapters/mobile-navigation';

const brand='<a class="brand" href="#hero" aria-label="Seamless Market Entry Advisory, beginning"><svg viewBox="0 0 60 44" aria-hidden="true"><path d="M5 34C18 31 31 15 50 8C65 2 49 24 37 28M8 38C25 42 53 22 54 21C65 18 47 38 32 40"/></svg><span>Seamless<br>Market Entry<br>Advisory</span></a>';

export default defineConfig(({mode})=>({
  plugins:[{name:'prototype-copy',transformIndexHtml(html) {
    const env=loadEnv(mode,fileURLToPath(new URL('.',import.meta.url)),'SEAMLESS_');
    const config=closingConfig(env);
    const navigation=en.nav.map(({id,label})=>`<a href="#${id}">${esc(label)}</a>`).join('');
    const services=serviceCatalog.map(({id,name,summary},index)=>
      `<li id="service-${esc(id??'')}" data-service="${index}"><h3>${esc(name??'')}</h3><p>${esc(summary??'')}</p></li>`).join('');
    const chapters=renderApproach()+renderMarkets()+renderDifferentiators()+renderContact(config.alias);
    return html.replace('<!-- approved-headline -->',esc(en.hero.replace('Emerging Arab Markets.',''))+'<em>Emerging Arab Markets.</em>')
      .replace('<!-- approved-support -->',esc(en.support))
      .replace('<!-- prototype-nav -->',navigation)
      .replace('<!-- mobile-nav -->',mobileNavigation())
      .replace('<!-- header-brand -->',brand)
      .replace('<!-- menu-brand -->',brand)
      .replace('<!-- services -->',services)
      .replace('<!-- remaining-chapters -->',chapters)
      .replace('<!-- cinematic-footer -->',renderFooter(config,2026));
  }}],
}));
