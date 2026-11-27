export function activateMarketSelection():void {
  const map=document.querySelector('#markets .region-map');
  const profiles=Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-country-profile]'));
  if(!map) return;
  for(const link of map.querySelectorAll<SVGAElement>('a')){
    const target=link.getAttribute('href');
    const profile=profiles.find((item)=>'#'+item.id===target);
    if(!target||!profile) continue;
    bindMarket(link,target,profile);
  }
  const openLinkedMarket=()=>{
    const target=profiles.find((item)=>'#'+item.id===location.hash);
    if(target) target.open=true;
  };
  window.addEventListener('hashchange',openLinkedMarket);
  openLinkedMarket();
}

function bindMarket(link:SVGAElement,target:string,profile:HTMLDetailsElement):void {
  const summary=profile.querySelector('summary');
  link.addEventListener('click',(event)=>{
    event.preventDefault();
    profile.open=true;
    if(location.hash!==target) history.pushState(null,'',target);
    summary?.focus({preventScroll:true});
    profile.scrollIntoView({block:'nearest'});
  });
  profile.addEventListener('toggle',()=>{
    if(profile.open) link.setAttribute('aria-current','true');
    else link.removeAttribute('aria-current');
  });
}
