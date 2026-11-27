import type { Service } from '../../../build/service-schema';
import { escapeHtml as esc } from '../../shared/render/escape-html';

function renderService(service: Service, index: number): string {
  return `<li class="service-panel" id="service-${esc(service.id)}"><div class="service-visual">
    <svg viewBox="0 0 144 126" aria-hidden="true"><circle cx="72" cy="63" r="50"></circle><path d="${esc(service.visual)}"></path></svg></div>
    <div class="service-text"><p class="kicker">Service ${String(index + 1).padStart(2,'0')}</p>
    <h3>${esc(service.name)}</h3><p>${esc(service.summary)}</p>
    <p class="service-benefit">${esc(service.benefit)}</p><a href="#contact">Discuss this service</a></div></li>`;
}
export function renderExpertise(services: readonly Service[]): string {
  return `<section id="expertise" class="section expertise" data-scene="expertise"><div class="inset">
    <p class="kicker">Expertise</p><h2>From portfolio questions to market decisions.</h2>
    <p class="lead">Six areas of support for pharmaceutical manufacturers.</p>
    <div class="service-window"><ol class="service-track">${services.map(renderService).join('')}</ol></div>
    <div class="service-progress" aria-hidden="true"><span data-service-progress></span></div></div></section>`;
}
