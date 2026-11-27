import { activateMotion } from '../../features/approach/activate-motion';

export function enhanceHome(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
  if (button) activateMotion(button);
}
