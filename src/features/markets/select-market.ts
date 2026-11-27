export function selectMarket(): void {
  const section = document.querySelector<HTMLElement>('#markets');
  if (!section) return;
  const links = Array.from(section.querySelectorAll<HTMLAnchorElement>('[data-market]'));
  const points = Array.from(document.querySelectorAll<SVGElement>('[data-country]'));
  const update = () => {
    for (const link of links) {
      const isCurrent = link.hash === location.hash;
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    for (const point of points) point.classList.toggle('is-selected', `#market-${point.dataset.country}` === location.hash);
  };
  window.addEventListener('hashchange', update);
  update();
}
