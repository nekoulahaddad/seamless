import { heroAsset } from '../../../content/scenes/asset-manifest';

export function renderFinale(): string {
  return `<section class="section finale" id="finale" data-scene="finale"><div class="finale-media" aria-hidden="true">
    <img src="${heroAsset.desktop}" width="${heroAsset.width}" height="${heroAsset.height}" alt="" loading="lazy" decoding="async" data-layer>
    <div class="journey-light" data-light></div></div><div class="inset finale-content">
    <p class="kicker">From molecule to market</p><h2>A clearer next step for your portfolio.</h2>
    <a class="cta primary" href="#contact">Book a Consultation</a></div></section>`;
}
