import { escapeHtml as esc } from '../../shared/render/escape-html';

export function renderContact(encoded: string, isRelease: boolean): string {
  const note = isRelease ? '' : '<p class="preview-note">Demonstration address. Do not send inquiries to this address.</p>';
  return `<section id="contact" class="section contact"><div class="inset split">
    <div><p class="kicker">Contact</p><h2>Let's Explore New Pharmaceutical Markets Together.</h2></div>
    <div><p class="lead">Tell us about your portfolio, target markets and what you want to explore.</p>${note}
    <p>Use your email app or reveal the email address. The email controls require browser scripts.</p>
    <div class="actions" data-contact="${esc(encoded)}" hidden>
      <button class="cta primary" type="button" data-email="open">Email Us</button>
      <button class="cta" type="button" data-email="reveal" aria-controls="email-address" aria-expanded="false">Reveal Email Address</button>
      <button class="cta" type="button" data-email="copy">Copy Email Address</button>
    </div><p id="email-address" class="address" hidden></p><p id="contact-status" role="status"></p>
    </div></div></section>`;
}
