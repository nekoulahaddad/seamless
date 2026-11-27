import { writeContactClipboard } from './contact-clipboard';

const feedbackDuration=1500;

export function activateClosingContact():void {
  const group=document.querySelector<HTMLElement>('[data-alias]');
  const status=document.querySelector<HTMLElement>('.contact-status');
  const link=group?.querySelector<HTMLAnchorElement>('[data-contact-action="open"]');
  const button=group?.querySelector<HTMLButtonElement>('[data-contact-action="copy"]');
  const announcement=document.querySelector<HTMLElement>('[data-copy-announcement]');
  if(!group?.dataset.alias||!status||!link||!button||!announcement) return;
  const encoded=group.dataset.alias;
  activateMailLink(link,encoded);
  activateCopyButton(button,encoded,status,announcement);
}

function activateMailLink(link:HTMLAnchorElement,encoded:string):void {
  link.removeAttribute('aria-disabled');
  link.tabIndex=0;
  link.addEventListener('click',()=>{
    const recipient=encodeURIComponent(atob(encoded)).replace('%40','@');
    link.href='mailto:'+recipient;
  });
  link.addEventListener('keydown',(event)=>{
    if(event.key!=='Enter'||link.hasAttribute('href')) return;
    event.preventDefault();
    link.click();
  });
}

function activateCopyButton(button:HTMLButtonElement,encoded:string,status:HTMLElement,announcement:HTMLElement):void {
  let clearStatus=0;
  let request=0;
  button.disabled=false;
  button.addEventListener('click',()=>{
    const current=++request;
    window.clearTimeout(clearStatus);
    delete button.dataset.copied;
    status.textContent='';
    announcement.textContent='';
    void writeContactClipboard(atob(encoded)).then((copied)=>{
      if(current!==request) return;
      if(copied){
        button.dataset.copied='';
        announcement.textContent='Copied to clipboard.';
      }else{
        status.textContent='Could not copy email. Try again.';
      }
      clearStatus=window.setTimeout(()=>{
        delete button.dataset.copied;
        status.textContent='';
      },feedbackDuration);
    });
  });
}
