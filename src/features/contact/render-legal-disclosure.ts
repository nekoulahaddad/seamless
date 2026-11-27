import type { DisclosureEntry } from '../../../build/site-input';
import { escapeHtml as esc } from '../../shared/render/escape-html';

export function renderDisclosures(path: string, entries: readonly DisclosureEntry[]): string {
  const items = entries.filter((entry) => entry.path === path);
  if (!items.length) return '';
  return `<aside aria-label="Legal disclosures" class="section disclosures"><div class="inset">
    ${items.map((entry) => `<p id="${esc(entry.elementId)}">${esc(entry.text)}</p>`).join('')}</div></aside>`;
}
