import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { verifyContent } from './review-chapters.mjs';

const origin=process.env.SEAMLESS_PROTO_URL??'http://127.0.0.1:4181/';
const output='.generated/static-layouts';
const widths=[360,390,768,1024,1440,1920];

async function capture(browser,width){
  const page=await browser.newPage({viewport:{width,height:width<=900?844:1000},hasTouch:width<=900});
  await page.goto(origin,{waitUntil:'networkidle'});
  await verifyContent(page);
  const anchor=await page.locator('[data-stage-anchor]').evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().toJSON()));
  if(width<=900) assert.ok(anchor.every((point,index)=>index===0||point.y>anchor[index-1].y));
  else assert.ok(anchor.every((point,index)=>index===0||(point.x>anchor[index-1].x&&Math.abs(point.y-anchor[0].y)<2)));
  const map=page.locator('.region-art img');
  await map.scrollIntoViewIfNeeded();
  const dimensions=await map.evaluate(async (img)=>{
    await img.decode();
    return {width:img.clientWidth,height:img.clientHeight,ratio:img.naturalWidth/img.naturalHeight,source:img.currentSrc};
  });
  assert.equal(dimensions.width,width);
  assert.ok(Math.abs(dimensions.width/dimensions.height-dimensions.ratio)<.007);
  assert.equal(dimensions.source.endsWith('regional-compact.webp'),width<=700);
  for(const [selector,name] of [['#approach','approach'],['#markets','map'],['#contact','contact'],['.cinematic-footer','footer']]){
    const section=page.locator(selector);
    await section.scrollIntoViewIfNeeded();
    await section.locator('img').evaluateAll(async images=>{await Promise.all(images.map(image=>image.decode()));});
    await section.screenshot({path:`${output}/${width}-${name}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
  }
  await page.close();
}

await mkdir(output,{recursive:true});
const browser=await chromium.launch();
try{
  for(const width of widths) await capture(browser,width);
  console.log(JSON.stringify({widths,screenshots:widths.length*4},null,2));
} finally{
  await browser.close();
}
