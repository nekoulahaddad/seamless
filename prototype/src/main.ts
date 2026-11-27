import './styles.css';
import { activateContact } from '../../src/features/contact/contact-controls';
import { activateMarketSelection } from './market-selection';

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

activateContact();
activateMarketSelection();

const menu=document.querySelector<HTMLDetailsElement>('.mobile-menu');
menu?.addEventListener('click',(event)=>{
  if(event.target instanceof HTMLAnchorElement) menu.open=false;
});
