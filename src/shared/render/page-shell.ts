import { escapeHtml as esc } from './escape-html';
import { renderBrowserBrand } from './browser-brand';

interface ShellProps {
  locale: string; direction: string; head: string; body: string;
}
export function renderShell(props: ShellProps): string {
  return `<!doctype html><html lang="${esc(props.locale)}" dir="${esc(props.direction)}">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    ${renderBrowserBrand()}
    <link rel="stylesheet" href="../../src/shared/styles/base.css">${props.head}</head><body>${props.body}</body></html>`;
}
