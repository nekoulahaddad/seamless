import { en } from '../../../content/locales/en';
import { heroAsset } from '../../../content/scenes/asset-manifest';
import { escapeHtml as esc } from '../../shared/render/escape-html';

export function renderHero(): string {
  return `<section class="hero" id="hero" aria-labelledby="hero-title" data-scene="hero">
    <div class="hero-figure" aria-hidden="true">
      <picture class="hero-media" data-layer><source media="(max-width: 680px)" srcset="${heroAsset.mobile}">
      <img src="${heroAsset.desktop}" alt="" fetchpriority="high" width="${heroAsset.width}" height="${heroAsset.height}"></picture>
      <div class="hero-glow" data-light></div><div class="hero-reflection" data-reflection></div>
    </div><div class="hero-content inset">
    <p class="kicker">From molecule to market</p><h1 id="hero-title">${esc(en.hero)}</h1>
    <p class="lead">${esc(en.support)}</p><div class="actions">
      <a class="cta primary" href="#contact">${esc(en.consult)}</a><a class="cta" href="#expertise">Explore Our Expertise</a>
    </div></div></section>`;
}
