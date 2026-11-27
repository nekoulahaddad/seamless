export function picture(name:string): string {
  return `<picture class="chapter-art" aria-hidden="true">
    <source media="(max-width: 900px)" srcset="/art/${name}-mobile.webp">
    <img src="/art/${name}.webp" width="1440" height="810" alt="" loading="lazy" decoding="async">
  </picture>`;
}
