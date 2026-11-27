export function activateMobileMenu():void {
  const trigger=document.querySelector<HTMLButtonElement>('.mobile-menu-trigger');
  const fallback=document.querySelector<HTMLDetailsElement>('.mobile-menu');
  const navigation=fallback?.querySelector('nav');
  const panel=document.querySelector<HTMLDialogElement>('.mobile-panel');
  const close=panel?.querySelector<HTMLButtonElement>('.mobile-menu-close');
  if(!trigger||!fallback||!navigation||!panel||!close||typeof panel.showModal!=='function') return;
  panel.querySelector('.mobile-panel-navigation')?.append(navigation);
  trigger.hidden=false;
  fallback.hidden=true;
  trigger.addEventListener('click',()=>{
    panel.returnValue='';
    trigger.focus({preventScroll:true});
    panel.showModal();
    trigger.setAttribute('aria-expanded','true');
  });
  close.addEventListener('click',()=>panel.close());
  panel.addEventListener('close',()=>{
    trigger.setAttribute('aria-expanded','false');
    if(panel.returnValue!=='navigate') trigger.focus({preventScroll:true});
  });
  panel.addEventListener('click',(event)=>followSection(event,panel));
  const compact=matchMedia('(max-width: 1150px)');
  compact.addEventListener('change',()=>{
    if(!compact.matches&&panel.open) panel.close();
  });
}

function followSection(event:MouseEvent,panel:HTMLDialogElement):void {
  if(!(event.target instanceof Element)) return;
  const link=event.target.closest<HTMLAnchorElement>('a[href^="#"]');
  if(!link) return;
  panel.close('navigate');
  const target=document.getElementById(link.hash.slice(1));
  if(!target) return;
  target.tabIndex=-1;
  target.focus({preventScroll:true});
}
