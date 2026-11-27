export function activateMenu(): void {
  const button = document.querySelector<HTMLButtonElement>('.menu-button');
  const links = document.querySelector<HTMLElement>('#site-links');
  if (!button || !links) return;
  const mobile = matchMedia('(max-width: 1060px)');
  const setOpen = (isOpen: boolean) => {
    button.setAttribute('aria-expanded', String(isOpen));
    links.dataset.open = String(isOpen);
  };
  button.hidden = false;
  links.dataset.enhanced = 'true';
  setOpen(false);
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && mobile.matches) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || links.dataset.open !== 'true') return;
    setOpen(false);
    button.focus();
  });
  mobile.addEventListener('change', () => {
    if (mobile.matches && links.contains(document.activeElement)) button.focus();
    setOpen(false);
  });
}
