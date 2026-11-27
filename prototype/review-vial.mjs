import assert from 'node:assert/strict';

export async function verifyVial(page,label,seek,snapshot) {
  const art=page.locator('.hero-art');
  const canvas=art.locator('canvas');
  const sameFrame=()=>page.screenshot({style:'.story-copy, .journey-path, header { visibility: hidden !important; }'});
  await art.locator('img').evaluate(image=>image.decode());
  await page.locator('[data-vial-ready="true"]').waitFor({state:'attached'});
  const closed=await sameFrame();
  await seek(page,'hero',.21);
  assert.equal(await art.getAttribute('data-cap-turn'),'0.000');
  assert.equal(await canvas.evaluate(hasPaint),false);
  await seek(page,'hero',.52);
  await page.waitForFunction(()=>Number(document.querySelector('.hero-art').dataset.capLift)>.2);
  await snapshot(page,label+'-opening');
  await seek(page,'hero',.82);
  await page.waitForFunction(()=>Number(document.querySelector('.hero-art').dataset.capLift)>.9);
  assert.ok(Number(await art.getAttribute('data-cap-turn'))>4);
  assert.equal(await canvas.evaluate(hasPaint),true);
  await snapshot(page,label+'-open');
  await page.evaluate(()=>scrollTo(0,0));
  await page.locator('.hero-art[data-cap-turn="0.000"]').waitFor({state:'attached'});
  assert.equal(await canvas.evaluate(hasPaint),false);
  const returned=await sameFrame();
  const maxDelta=await largestPixelDifference(page,closed,returned);
  // Chromium can rerasterize a composited photograph with a tiny channel difference.
  assert.ok(maxDelta<=3,label+' did not restore the hero composition: '+maxDelta);
}

function hasPaint(canvas) {
  const context=canvas.getContext('2d');
  return context.getImageData(0,0,canvas.width,canvas.height).data.some((value,index)=>index%4===3&&value>0);
}

async function largestPixelDifference(page,before,after) {
  return page.evaluate(async (sources)=>{
    const images=await Promise.all(sources.map(async (source)=>{
      const image=new Image();
      image.src='data:image/png;base64,'+source;
      await image.decode();
      const canvas=document.createElement('canvas');
      canvas.width=image.width;
      canvas.height=image.height;
      const context=canvas.getContext('2d');
      context.drawImage(image,0,0);
      return context.getImageData(0,0,canvas.width,canvas.height).data;
    }));
    const [left,right]=images;
    let largest=0;
    for(let i=0;i<left.length;i++){
      largest=Math.max(largest,Math.abs(left[i]-right[i]));
    }
    return largest;
  },[before.toString('base64'),after.toString('base64')]);
}
