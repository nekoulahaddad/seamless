import { escapeHtml as esc } from '../../src/shared/render/escape-html';
import { picture } from './art';

const mail='M3 5h18v14H3zM3 6l9 7 9-7';
const copy='M9 8h12v13H9zM15 5V3H3v13h3';
const check='<svg class="contact-check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4 10-9"/></svg>';

function actionContent(label:string,path:string,confirmation=''):string {
  return `<span class="contact-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>${confirmation}</span>
    <span>${label}</span>`;
}

export function renderContact(alias:string|undefined):string {
  return `<section id="contact" class="chapter contact-chapter" aria-labelledby="contact-title">
    ${picture('contact')}
    <div class="contact-copy">
      <p class="scene-label">Contact</p>
      <h2 id="contact-title">Let's Explore New Pharmaceutical Markets <em>Together.</em></h2>
      <p class="description">Tell us about your portfolio, target markets and what you want to explore.</p>
      <div class="contact-actions" data-alias="${esc(alias??'')}">
        <a class="contact-action" role="link" aria-disabled="true" data-contact-action="open">
          ${actionContent('Email Us',mail)}</a>
        <button class="contact-action" type="button" disabled data-contact-action="copy">
          ${actionContent('Copy Email Address',copy,check)}</button>
      </div>
      <p class="contact-status" role="status"></p>
      <span class="sr-only" data-copy-announcement role="status"></span>
    </div></section>`;
}
