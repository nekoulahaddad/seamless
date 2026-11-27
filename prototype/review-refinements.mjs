import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const origin=process.env.SEAMLESS_PROTO_URL??'http://127.0.0.1:4182/';
const output='.generated/final-refinements';
const widths=[360,390,768,1024,1440,1920];

async function doReview(browser,width){
  const page=await browser.newPage({viewport:{width,height:900},isMobile:width<768,hasTouch:width<768});
  await page.goto(origin,{waitUntil:'networkidle'});
  await page.locator('.path-bed[d]').waitFor({state:'attached'});
  const alignment=await checkAbout(page,width);
  await checkAdvantages(page,width);
  const footer=page.locator('.cinematic-footer');
  assert.equal(await footer.getByRole('link').count(),2);
  assert.equal(await footer.getByRole('link',{name:'NMAX'}).getAttribute('href'),'https://nmax.tech');
  if(width===390||width===1440) await footer.screenshot({path:`${output}/footer-${width}.png`});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);
  await page.close();
  return {width,alignment};
}

async function checkAbout(page,width){
  await seekAbout(page,.02);
  const still=page.locator('.expert-still');
  await still.evaluate(image=>image.decode());
  const anchor=await readPinch(page,width);
  assert.ok(anchor.error<1&&anchor.isFullWidth,JSON.stringify({width,...anchor}));
  await page.screenshot({path:`${output}/about-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
  await seekAbout(page,.77);
  await page.locator('.expert-art[data-live="capsule"]').waitFor({state:'attached'});
  await page.waitForFunction(()=>Number(document.querySelector('.scan-beam').style.opacity)>.2);
  assert.equal(await page.locator('.capsule-fallback').isVisible(),false);
  if(width===1440) await page.screenshot({path:`${output}/about-scan-1440.png`,style:'.site-header{visibility:hidden}'});
  await seekAbout(page,.02);
  const error=await page.locator('[data-model="capsule"] svg g').evaluate((pill)=>{
    const center=pill.getScreenCTM();
    const {left,top}=pill.closest('.expert-art').getBoundingClientRect();
    const style=getComputedStyle(pill.closest('.expert-art'));
    const x=left+parseFloat(style.getPropertyValue('--pinch-x'));
    const y=top+parseFloat(style.getPropertyValue('--pinch-y'));
    return Math.hypot(x-center.e,y-center.f);
  });
  assert.ok(error<1,`Restored capsule at ${width}px is off by ${error}px`);
  if(width<=900) await checkMobileTransition(page,width);
  return anchor.error;
}

async function readPinch(page,width){
  return page.locator('.expert-art').evaluate((scene,viewport)=>{
    const small=viewport<=900;
    const image=scene.querySelector('img');
    const fit=Math.max(scene.clientWidth/image.naturalWidth,scene.clientHeight/image.naturalHeight);
    const actual=image.style.transformOrigin||getComputedStyle(image).transformOrigin;
    const [x,y]=actual.split(' ').map(parseFloat);
    const imageX=small?(1200-690)*820/975:1200;
    const imageY=small?(578-72)*630/749:578;
    const expectedX=(scene.clientWidth-image.naturalWidth*fit)*.65+imageX*fit;
    const expectedY=(scene.clientHeight-image.naturalHeight*fit)*.48+imageY*fit;
    return {error:Math.hypot(x-expectedX,y-expectedY),isFullWidth:scene.clientWidth===viewport};
  },width);
}

async function seekAbout(page,progress){
  await page.locator('#about').evaluate(async(section,value)=>{
    const top=section.getBoundingClientRect().top+scrollY;
    const travel=section.offsetHeight-section.querySelector('.shot').offsetHeight;
    scrollTo(0,top+travel*value);
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  },progress);
}

async function checkMobileTransition(page,width){
  await seekAbout(page,1);
  const gap=await page.evaluate(()=>{
    const photo=document.querySelector('.expert-art').getBoundingClientRect();
    const title=document.querySelector('#expertise .eyebrow').getBoundingClientRect();
    return title.top-photo.bottom;
  });
  assert.ok(gap>=0&&gap<=36,`Mobile transition has a ${gap}px gap at ${width}px`);
  if(width===390){
    await page.screenshot({path:`${output}/about-to-expertise-390.png`,style:'.site-header{visibility:hidden}'});
  }
}

async function checkAdvantages(page,width){
  const section=page.locator('#why-work-with-us');
  await section.scrollIntoViewIfNeeded();
  await section.locator('.advantage-atmosphere, .stationary-vial').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
  assert.equal(await section.locator('.advantage-card').count(),7);
  assert.equal(await section.getByRole('link').count(),0);
  const positions=await section.locator('.advantage-card').evaluateAll(cards=>cards.map(card=>card.getBoundingClientRect().top));
  assert.equal(new Set(positions).size,width<=900?7:2);
  await section.screenshot({path:`${output}/why-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
}

await mkdir(output,{recursive:true});
const browser=await chromium.launch();
try{
  const results=[];
  for(const width of widths) results.push(await doReview(browser,width));
  console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
