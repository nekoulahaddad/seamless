import { defineConfig } from 'vite';
import { en } from '../content/locales/en';
import { serviceCatalog } from '../content/services/catalog';
import { escapeHtml as esc } from '../src/shared/render/escape-html';
import { renderApproach } from './chapters/approach';
import { renderClosing, renderPreviewLegal } from './chapters/closing';
import { renderConnections } from './chapters/connections';
import { renderMarkets } from './chapters/markets';

export default defineConfig({
  plugins: [{name:'prototype-copy',transformIndexHtml(html) {
    const navigation=en.nav.map(({id,label})=>`<a href="#${id}">${esc(label)}</a>`).join('');
    const services=serviceCatalog.map(({id,name,summary},index)=>
      `<li id="service-${esc(id??'')}" data-service="${index}"><h3>${esc(name??'')}</h3><p>${esc(summary??'')}</p></li>`).join('');
    return html.replace('<!-- approved-headline -->',esc(en.hero.replace('Emerging Arab Markets.',''))+'<em>Emerging Arab Markets.</em>')
      .replace('<!-- approved-support -->',esc(en.support))
      .replace('<!-- prototype-nav -->',navigation)
      .replace('<!-- mobile-nav -->',navigation)
      .replace('<!-- connections -->',renderConnections())
      .replace('<!-- services -->',services)
      .replace('<!-- remaining-chapters -->',renderApproach()+renderMarkets()+renderClosing())
      .replace('<!-- preview-policies -->',renderPreviewLegal());
  }}],
});
