import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { approachMotion } from './approach-motion';
import { expertiseMotion } from '../expertise/expertise-motion';
import { marketMotion } from '../markets/market-motion';
import { differentiatorsMotion } from '../credibility/differentiators-motion';
import { heroMotion } from '../hero/hero-motion';
import { finaleMotion } from './finale-motion';
import { refreshOnSceneLoad } from './scene-assets';
import type { ActiveMode } from './presentation-mode';

export function startScenes(mode: ActiveMode): () => void {
  const cleanup: (() => void)[] = [];
  const isFull = mode === 'full';
  const context = gsap.context(() => {
    for (const section of document.querySelectorAll<HTMLElement>('[data-scene]')) {
      switch (section.dataset.scene) {
        case 'hero': heroMotion(section,isFull); break;
        case 'finale': finaleMotion(section,isFull); break;
        case 'approach': cleanup.push(approachMotion(section,isFull)); break;
        case 'expertise': cleanup.push(expertiseMotion(section,isFull)); break;
        case 'markets': case 'connections': marketMotion(section,isFull); break;
        case 'credibility': differentiatorsMotion(section); break;
      }
    }
  });
  cleanup.push(refreshOnSceneLoad(()=>ScrollTrigger.refresh()));
  ScrollTrigger.refresh();
  return () => { cleanup.forEach((dispose)=>dispose()); context.revert(); };
}
