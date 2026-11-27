import type { Credibility } from '../../../build/credibility-schema';
import { escapeHtml as esc } from '../../shared/render/escape-html';

export function renderNetwork(records: readonly Credibility[]): string {
  const partners = records.filter((item)=>item.kind==='partner');
  return `<section class="section network" id="partners"><div class="inset split">
    <div><p class="kicker">Partners and network</p><h2>Regional relationships.</h2></div>
    <div><p class="lead">Our network involves companies based in Dubai and Saudi Arabia.</p>
    ${partners.map((item)=>`<article><h3>${esc(item.title)}</h3>
      ${item.logo?`<img src="${esc(item.logo)}" alt="" width="64" height="64" loading="lazy">`:''}
      <p>${esc(item.role)} · ${esc(item.cooperation)}</p><p>${esc(item.text)}</p></article>`).join('')}</div>
    </div></section>`;
}
