import { marketCatalog } from '../../content/markets/catalog';
import { networkLocations } from '../../content/network/locations';
import { escapeHtml as esc } from '../../src/shared/render/escape-html';

export function renderConnections():string {
  const markets=marketCatalog.map(({name})=>esc(name)).join(', ');
  const network=networkLocations.map(({name})=>esc(name)).join(' and ');
  return `<section id="connections" class="chapter connections-chapter" aria-labelledby="connections-title">
    <div class="chapter-grid"><div><h2 id="connections-title" data-journey-point>One region. Distinct routes to market.</h2>
    <a class="text-link" href="#markets">Explore the markets</a></div>
    <div class="connection-register"><p><strong>Target markets</strong>${markets}</p>
    <p><strong>Network locations</strong>${network}</p></div></div>
  </section>`;
}
