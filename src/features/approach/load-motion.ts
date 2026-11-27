import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startScenes } from './scene-lifecycle';
import type { ActiveMode } from './presentation-mode';

export function loadMotion(mode: ActiveMode): () => void {
  gsap.registerPlugin(ScrollTrigger);
  return startScenes(mode);
}
