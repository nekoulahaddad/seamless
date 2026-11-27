import type { Market, NetworkLocation } from '../../../build/geography-schema';
import { escapeHtml as esc } from '../../shared/render/escape-html';

const land = 'M20 73l34-22 37 14 28-17 33 12 26 29 42 1 41-8 37 9 20-22 32-9 29 10 23 26 30 1 45 29 30 48-24 23-46 21-36-13-19-35-35-15-26 20-60-13-31 30-34-5-28-44-40-10-16-28-51-1-48-26z';

function renderMap(markets: readonly Market[], locations: readonly NetworkLocation[]): string {
  const nodes = markets.map((point) => `<a href="#market-${esc(point.id)}" aria-label="Open ${esc(point.name)} market">
    <circle class="market-hit" cx="${point.x}" cy="${point.y}" r="13"/>
    <circle data-country="${esc(point.id)}" cx="${point.x}" cy="${point.y}" r="5"/></a>`).join('');
  const network = locations.map((point) => `<rect x="${point.x-5}" y="${point.y-5}" width="10" height="10"/>`).join('');
  return `<svg class="region-map" viewBox="0 0 520 240" role="group" aria-label="Illustrative target market map">
    <path class="land" d="${land}" aria-hidden="true"/>
    <path class="connections" d="M325 78Q398 40 460 139M168 121Q270 -12 399 147M399 147T460 139" aria-hidden="true"/>
    <g class="market-points">${nodes}</g><g class="network-points" aria-hidden="true">${network}</g></svg>`;
}
export function renderConnections(markets: readonly Market[], locations: readonly NetworkLocation[]): string {
  return `<section class="section connections-section" id="connections" data-scene="connections"><div class="inset split">
    <div><p class="kicker">Global market connections</p><h2>One region. Distinct routes to market.</h2>
    <p class="lead">Explore five target markets. Our regional partner network is separate from those markets.</p>
    <a class="cta" href="#markets">Explore the markets</a></div>
    <div class="map-frame" data-layer>${renderMap(markets, locations)}
    <p><strong>Target markets:</strong> ${markets.map((item) => esc(item.name)).join(', ')}</p>
    <p><strong>Network locations:</strong> ${locations.map((item) => esc(item.name)).join(', ')}</p></div>
    </div></section>`;
}
export function renderSelectionMap(markets: readonly Market[], locations: readonly NetworkLocation[]): string {
  return `<div class="map-frame" data-layer>${renderMap(markets, locations)}
    <p>Illustrative regional map. Circles show target markets; squares show network locations.</p></div>`;
}
