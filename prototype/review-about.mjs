import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const origin=process.env.SEAMLESS_PROTO_URL??'http://127.0.0.1:4181/';
const output='.generated/about-mobile';
const widths=[360,390,430];

async function verifyLayout(page,width){
  return page.locator('.about-shot').evaluate((shot,expected)=>{
    const art=shot.querySelector('.expert-art');
    const picture=art.querySelector('img');
    const content=shot.querySelector('.about-copy');
    const box=art.getBoundingClientRect();
    const copy=content.getBoundingClientRect();
    const shotBox=shot.getBoundingClientRect();
    return {viewport:expected,shotWidth:shotBox.width,imageWidth:box.width,imageLeft:box.left,
      gap:Math.round(box.top-copy.bottom),imageRatio:box.width/box.height,sourceRatio:picture.naturalWidth/picture.naturalHeight,
      textPadding:parseFloat(getComputedStyle(content).paddingInlineStart),scrollWidth:document.documentElement.scrollWidth};
  },width);
}

async function capture(browser,width){
  const page=await browser.newPage({viewport:{width,height:820},hasTouch:true,isMobile:true});
  await page.goto(origin);
  const section=page.locator('#about');
  await section.evaluate((element)=>{
    const top=element.getBoundingClientRect().top+scrollY;
    scrollTo(0,top+(element.offsetHeight-element.querySelector('.about-shot').offsetHeight)*.77);
  });
  await page.locator('.expert-still').evaluate(img=>img.decode());
  await page.waitForFunction(()=>Number(document.querySelector('.scan-beam').style.opacity)>.2);
  const result=await verifyLayout(page,width);
  assert.equal(result.shotWidth,width);
  assert.equal(result.imageWidth,width);
  assert.equal(result.imageLeft,0);
  assert.equal(result.scrollWidth,width);
  assert.ok(result.textPadding>=16&&result.gap>=0&&result.gap<=16);
  assert.ok(Math.abs(result.imageRatio-result.sourceRatio)<.002);
  await assertPath(page);
  await page.screenshot({path:`${output}/about-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
  await page.close();
  return result;
}

async function assertPath(page){
  const marker=page.locator('.path-nodes circle').nth(1);
  const x=Number(await marker.getAttribute('cx'));
  assert.ok(Math.abs(x-page.viewportSize().width*.028)<.1);
  assert.ok(Number(await page.locator('.journey-path').getAttribute('data-visible-length'))>0);
}

await mkdir(output,{recursive:true});
const browser=await chromium.launch();
try{
  const cases=[];
  for(const width of widths) cases.push(await capture(browser,width));
  console.log(JSON.stringify(cases,null,2));
} finally{
  await browser.close();
}
