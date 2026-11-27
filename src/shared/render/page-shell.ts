import { escapeHtml as esc } from './escape-html';

interface ShellProps {
  locale: string; direction: string; head: string; body: string; isHome: boolean;
}
export function renderShell(props: ShellProps): string {
  const style = props.isHome ? '../src/pages/home/home.css' : '../../src/shared/styles/base.css';
  const script = props.isHome ? '<script type="module" src="../src/pages/home/start-home.ts"></script>' : '';
  return `<!doctype html><html lang="${esc(props.locale)}" dir="${esc(props.direction)}">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#080f1c"><link rel="icon" href="/scenes/mark.svg">
    <link rel="stylesheet" href="${style}">${props.head}${script}</head><body>${props.body}</body></html>`;
}
