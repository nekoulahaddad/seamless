const desktop={width:1671,height:941,x:1200,y:578,length:72};
const mobile={width:820,height:630,x:(1200-690)*820/975,y:(578-72)*630/749,length:72*630/749};

export function registerAboutArtwork():void {
  const scene=document.querySelector<HTMLElement>('.expert-art');
  const poster=scene?.querySelector<HTMLImageElement>('.expert-still');
  if(!scene||!poster) return;
  const compact=matchMedia('(max-width:900px)');
  const update=()=>{
    const crop=compact.matches?mobile:desktop;
    const fit=Math.max(scene.clientWidth/crop.width,scene.clientHeight/crop.height);
    const left=(scene.clientWidth-crop.width*fit)*.65;
    const top=(scene.clientHeight-crop.height*fit)*.48;
    scene.style.setProperty('--pinch-x',`${left+crop.x*fit}px`);
    scene.style.setProperty('--pinch-y',`${top+crop.y*fit}px`);
    scene.style.setProperty('--pinch-length',`${crop.length*fit}px`);
    scene.style.setProperty('--pinch-window',`${crop.length*fit*8}px`);
  };
  new ResizeObserver(update).observe(scene);
  compact.addEventListener('change',update);
  update();
}
