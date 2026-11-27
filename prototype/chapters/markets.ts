import { marketCatalog } from '../../content/markets/catalog';
import { networkLocations } from '../../content/network/locations';
import { serviceCatalog } from '../../content/services/catalog';
import { renderSelectionMap } from '../../src/features/markets/render-market-map';
import { escapeHtml as esc } from '../../src/shared/render/escape-html';
import { picture } from './art';

function marketDetails(market:(typeof marketCatalog)[number]):string {
  const services:readonly string[]=market.services;
  const links=serviceCatalog.filter(({id})=>id&&services.includes(id)).map(({id,name})=>
    `<li><a href="#service-${esc(id??'')}">${esc(name??'')}</a></li>`).join('');
  return `<details id="market-${market.id}" name="target-market" data-country-profile>
    <summary><span>${esc(market.name)}</span><small>${esc(market.region)}</small></summary>
    <ul>${links}</ul><a class="text-link" href="#contact">Discuss market entry<span class="sr-only"> for ${esc(market.name)}</span></a>
  </details>`;
}

export function renderMarkets():string {
  const markets=marketCatalog.map((market)=>({...market,services:[...market.services]}));
  return `<section id="markets" class="chapter markets-chapter" aria-labelledby="markets-title">
    ${picture('markets')}
    <div class="chapter-grid">
      <div class="market-visual"><h2 id="markets-title" data-journey-point>Our Markets</h2>
        ${renderSelectionMap(markets,networkLocations)}
      </div>
      <div class="market-directory">${marketCatalog.map(marketDetails).join('')}</div>
    </div></section>`;
}
