import { copyAddress } from './copy-address';

export function activateContact(): void {
  const controls = document.querySelector<HTMLElement>('[data-contact]');
  const target = document.querySelector<HTMLElement>('#email-address');
  const status = document.querySelector<HTMLElement>('#contact-status');
  const revealButton = controls?.querySelector('[data-email="reveal"]');
  if (!controls || !target || !status || !revealButton) return;
  const encoded = controls.dataset.contact;
  if (!encoded) return;
  const reveal = (address: string) => {
    target.textContent = address;
    target.hidden = false;
    revealButton.setAttribute('aria-expanded', 'true');
  };
  controls.hidden = false;
  controls.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    const action = event.target.dataset.email;
    const address = new TextDecoder().decode(Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0)));
    if (action === 'open') window.location.href = `mailto:${address}`;
    if (action === 'reveal') { reveal(address); status.textContent = `Email address: ${address}`; }
    if (action !== 'copy') return;
    void copyAddress(address).then((copied) => {
      if (!copied) reveal(address);
      status.textContent = copied ? 'Email address copied.' : 'Could not copy automatically. Select and copy the address above.';
    });
  });
}
