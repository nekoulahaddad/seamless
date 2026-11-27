import { en } from '../../../../content/locales/en';
import { escapeHtml as esc } from '../../../shared/render/escape-html';

const icons={
  about:'M2 8l10-6 10 6-10 6zM2 12l10 6 10-6M2 16l10 6 10-6',
  expertise:'M9 2h6M10 2v8l-6 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-9V2M8 15h8',
  approach:'M2 8l10-6 10 6-10 6zM2 12l10 6 10-6M2 16l10 6 10-6',
  markets:'M22 12a10 10 0 1 1-20 0 10 10 0 1 1 20 0ZM2 12h20M12 2c-6 5-6 15 0 20m0-20c6 5 6 15 0 20M4 6h16M4 18h16',
  partners:'M9 5a3 3 0 1 0 6 0 3 3 0 1 0-6 0ZM2 19a3 3 0 1 0 6 0 3 3 0 1 0-6 0Zm14 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0ZM10 8l-4 8m8-8 4 8M8 19h8',
  'why-work-with-us':'M2 9l3-5 4 2-3 6zM22 9l-3-5-4 2 3 6zM8 7l4-2 4 2M7 11l-2 2 2 3 2-2m-2 2 2 2 2-2m-2 2 3 2 2-2m-2 2 3 1 2-3M10 8l2 1-3 3 2 1 3-2 5 4-1 2-3-2m3 2-2 2-3-2',
  contact:'M2 5h20v14H2zM2 6l10 8 10-8',
};
const order=['about','expertise','approach','markets','partners','why-work-with-us','contact'] as const;
const calendar='M3 5h18v16H3zM7 2v6m10-6v6M3 10h18m-13 4h1m3 0h1m3 0h1m-9 3h1m3 0h1';

function icon(path:string):string {
  return `<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
}

export function mobileNavigation():string {
  const links=order.map((id)=>{
    const label=en.nav.find((item)=>item.id===id)?.label??'';
    return `<a class="menu-link" href="#${id}">${icon(icons[id])}<span>${esc(label)}</span>
      <span class="menu-chevron" aria-hidden="true"></span></a>`;
  });
  return links.join('')+`<a class="menu-consult" href="#contact">${icon(calendar)}${esc(en.consult)}</a>`;
}
