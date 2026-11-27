import { presentationMode } from './presentation-mode';
import { motionPreferences } from './motion-preferences';
import { captureSection, restoreSection } from './scroll-position';

function updateModeLabel(button: HTMLButtonElement, isStatic: boolean, isReduced: boolean): void {
  button.textContent = isStatic ? 'Enable Motion' : 'Pause Motion';
  button.disabled = isReduced;
  button.hidden = isReduced;
  document.documentElement.dataset.motion = 'static';
}

export function activateMotion(button: HTMLButtonElement): void {
  const { reduced,desktop } = motionPreferences();
  let isDisabled = false;
  let generation = 0;
  let dispose: (() => void) | undefined;
  const update = async () => {
    const anchor=generation>0 ? captureSection() : undefined;
    const current = ++generation;
    dispose?.();
    dispose = undefined;
    const mode = presentationMode(isDisabled || reduced.matches,desktop.matches);
    updateModeLabel(button, mode === 'static', reduced.matches);
    if (mode === 'static') { restoreSection(anchor); return; }
    try {
      const { loadMotion } = await import('./load-motion');
      if (generation !== current) return;
      document.documentElement.dataset.motion = mode;
      dispose = loadMotion(mode);
      restoreSection(anchor);
    } catch {
      updateModeLabel(button, true, true);
    }
  };
  button.addEventListener('click', () => { isDisabled = !isDisabled; void update(); });
  reduced.addEventListener('change',()=>{ void update(); });
  desktop.addEventListener('change',()=>{ void update(); });
  void update();
}
