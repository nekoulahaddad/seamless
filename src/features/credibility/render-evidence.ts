import type { Credibility } from '../../../build/credibility-schema';
import { escapeHtml as esc } from '../../shared/render/escape-html';

const sections = [
  { kind:'manufacturer', id:'manufacturers', title:'Verified pharmaceutical manufacturers' },
  { kind:'metric', id:'track-record', title:'Our track record' },
  { kind:'case', id:'case-studies', title:'Case studies' },
] as const;
function details(item: Credibility): string {
  switch (item.kind) {
    case 'manufacturer': return `<p>${esc(item.country)} · ${esc(item.facility)}</p>
      <img src="${esc(item.logo)}" alt="" width="64" height="64" loading="lazy">
      <img src="${esc(item.image)}" alt="" width="720" height="480" loading="lazy">`;
    case 'metric': return `<p><strong>${item.value}</strong></p>`;
    case 'case': return `<p>${esc(item.market)} · ${item.services.map(esc).join(', ')}</p>
      <p>${esc(item.approach)}</p><p>${esc(item.outcome)}</p>`;
    case 'partner': return '';
  }
}
export function renderEvidence(records: readonly Credibility[]): string {
  return sections.map(({kind,id,title}) => {
    const group = records.filter((item)=>item.kind===kind);
    if (!group.length) return '';
    return `<section class="section" id="${id}"><div class="inset"><h2>${title}</h2>
      ${group.map((item)=>`<article><h3>${esc(item.title)}</h3>${details(item)}<p>${esc(item.text)}</p><p>${esc(item.scope)}</p></article>`).join('')}</div></section>`;
  }).join('');
}
