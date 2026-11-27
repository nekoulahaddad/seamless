import type { Market, NetworkLocation } from '../../../build/geography-schema';
import type { Service } from '../../../build/service-schema';
import { escapeHtml as esc } from '../../shared/render/escape-html';
import { renderSelectionMap } from './render-market-map';

function renderProfile(market: Market, services: readonly Service[]): string {
  const links = services.filter((item) => market.services.includes(item.id))
    .map((item) => `<a href="#service-${esc(item.id)}">${esc(item.name)}</a>`).join(' · ');
  return `<article id="market-${esc(market.id)}" class="market-profile" tabindex="-1">
    <p class="kicker">${esc(market.region)}</p><h3>${esc(market.name)}</h3><p>${links}</p>
    <a href="#contact">Discuss market entry<span class="sr-only"> for ${esc(market.name)}</span></a></article>`;
}
export function renderMarkets(markets: readonly Market[], locations: readonly NetworkLocation[], services: readonly Service[]): string {
  const items = markets.map((item) => `<a href="#market-${esc(item.id)}" data-market="${esc(item.id)}">${esc(item.name)}</a>`).join('');
  return `<section class="section markets" id="markets" data-scene="markets"><div class="inset">
    <p class="kicker">Our markets</p><h2>Where are you looking to enter?</h2>
    <div class="market-layout">${renderSelectionMap(markets,locations)}
    <div><nav class="market-links" aria-label="Target countries">${items}</nav>
    <div class="market-profiles">${markets.map((item) => renderProfile(item,services)).join('')}</div></div>
    </div></div></section>`;
}
