import { marketCatalog } from '../../../../content/markets/catalog';
import { networkLocations } from '../../../../content/network/locations';
import { escapeHtml as esc } from '../../../shared/render/escape-html';

function regionalPicture():string {
  return `<picture class="region-art">
    <source media="(max-width: 700px)" srcset="/art/regional-compact.webp" width="1280" height="1000">
    <img width="1920" height="930" src="/art/regional-desktop.webp"
      srcset="/art/regional-desktop.webp 1920w, /art/regional-wide.webp 3840w" sizes="100vw"
      loading="lazy" decoding="async" alt="Nighttime view of North Africa and the Middle East with target markets in turquoise and illustrative connections to the strategic network in gold.">
  </picture>`;
}

export function renderMarkets():string {
  const markets=marketCatalog.map(({name})=>esc(name)).join(', ');
  const network=networkLocations.map(({name})=>esc(name)).join(' and ');
  return `<section id="markets" class="chapter region-chapter" aria-labelledby="markets-title">
    <div class="region-copy">
      <p class="scene-label">Regional connectivity</p>
      <h2 id="markets-title" data-journey-point>One Region.<br>Distinct <em>Routes to Market.</em></h2>
      <p class="description">Explore five target markets and a regional network for pharmaceutical market entry.</p>
    </div>
    ${regionalPicture()}
    <div class="region-legend">
      <div><strong>Target Markets</strong><span>${markets}</span></div>
      <div id="partners"><strong>Strategic Network</strong><span>${network}</span></div>
    </div>
  </section>`;
}
