import './styles.css';
import { activateClosingContact } from './contact-actions';
import { activateMobileMenu } from './mobile-menu';
import { activateOrbit } from './orbit/play-orbit';
import { registerAboutArtwork } from './scroll/about-registration';

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let dispose:(()=>void)|undefined;
let generation=0;

async function syncMotionPreference():Promise<void> {
  const serial=++generation;
  if (reduced.matches) {
    dispose?.();
    dispose=undefined;
    delete document.documentElement.dataset.motion;
    return;
  }
  try {
    const {runJourney}=await import('./scroll/run');
    if(serial===generation) dispose=runJourney();
  } catch {
    if(serial===generation) delete document.documentElement.dataset.motion;
  }
}

reduced.addEventListener('change',()=>{void syncMotionPreference();});
void syncMotionPreference();

activateClosingContact();

activateMobileMenu();

activateOrbit();
registerAboutArtwork();
