import { reviewReducedMotion, reviewResponsive, reviewWithoutScripts } from './review-responsive.mjs';
import { verifyAxe, verifyContent, verifyLater, verifyMarkets } from './review-chapters.mjs';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { verifyVial } from './review-vial.mjs';
import { chromium } from 'playwright';

const output = new URL('../.generated/prototype-review/',import.meta.url);
const origin = process.env.SEAMLESS_PROTO_URL ?? 'http://127.0.0.1:4181/';
const desktop={width:1440,height:900};

async function ready(page) {
  await page.goto(origin,{waitUntil:'networkidle'});
  await page.locator('html[data-motion="on"]').waitFor({state:'attached'});
}
async function seek(page,id,progress) {
  await page.evaluate(([name,value])=>{
    const section=document.getElementById(name);
    const shot=section.querySelector('.shot');
    const top=section.getBoundingClientRect().top+scrollY;
    scrollTo(0,top+(section.offsetHeight-shot.offsetHeight)*value);
  },[id,progress]);
}

async function snapshot(page,name) {
  const path=new URL(name+'.png',output);
  await page.screenshot({path:decodeURIComponent(path.pathname.replace(/^\/(?=[A-Za-z]:)/,''))});
}

async function frameSample(page) {
  return page.evaluate(async()=>{
    const target=document.getElementById('hero');
    const range=target.offsetHeight-target.querySelector('.shot').offsetHeight;
    const start=target.getBoundingClientRect().top+scrollY;
    const times=[];
    let before=performance.now();
    for(let i=0;i<40;i++){
      await new Promise(requestAnimationFrame);
      const now=performance.now();
      times.push(now-before);
      before=now;
      scrollTo(0,start+range*(.32+i*.013));
    }
    times.sort((a,b)=>a-b);
    return Math.round(times[Math.ceil(times.length*.95)-1]*10)/10;
  });
}

async function reviewHero(page) {
  assert.equal(await page.locator('.site-header button').count(),0);
  const path=page.locator('.journey-path');
  assert.equal(await path.getAttribute('data-lit-nodes'),'0');
  assert.equal(await path.getAttribute('data-visible-length'),'0');
  const typography=await page.locator('h1').evaluate(headline=>{
    const range=document.createRange();
    range.selectNodeContents(headline);
    return {lines:new Set(Array.from(range.getClientRects(),rect=>Math.round(rect.top))).size,
      pixels:parseFloat(getComputedStyle(headline).fontSize)};
  });
  assert.ok(typography.lines>=4&&typography.lines<=5,JSON.stringify(typography));
  assert.ok(typography.pixels<=50);
  await snapshot(page,'01-hero');
  await verifyVial(page,'02-desktop-vial',seek,snapshot);
  await seek(page,'hero',.82);
  await page.waitForFunction(()=>Number(document.querySelector('.journey-path').dataset.visibleLength)>0);
  return frameSample(page);
}

async function reviewAbout(page) {
  const art=page.locator('.expert-art');
  await seek(page,'about',.78);
  await page.locator('[data-live="capsule"]').waitFor({state:'attached'});
  await page.waitForFunction(()=>Number(document.querySelector('.scan-beam').style.opacity)>.2);
  await snapshot(page,'03-capsule-scan');
  const before=await page.evaluate(()=>scrollY);
  await page.reload({waitUntil:'networkidle'});
  await page.locator('html[data-motion="on"]').waitFor({state:'attached'});
  const after=await page.evaluate(()=>scrollY);
  assert.ok(Math.abs(before-after)<35,`Reload lost scroll position: ${before} -> ${after}`);
  await page.setViewportSize({width:1280,height:840});
  await page.locator('.journey-path[data-visible-length]').waitFor({state:'attached'});
  await page.setViewportSize(desktop);
  assert.ok(await art.isVisible());
}

async function reviewBranches(page) {
  await seek(page,'expertise',.44);
  await page.waitForFunction(()=>{
    const count=Number(document.querySelector('#expertise').dataset.litBranches);
    return count>1&&count<6;
  });
  await snapshot(page,'04-expertise');
  await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
  await page.locator('#expertise[data-lit-branches="6"]').waitFor({state:'attached'});
  await page.evaluate(()=>scrollTo(0,0));
  await page.locator('.journey-path[data-visible-length="0"]').waitFor({state:'attached'});
  assert.equal(await page.locator('.hero-art').getAttribute('data-cap-lift'),'0.000');
  assert.equal(await page.locator('.hero-art').getAttribute('data-cap-turn'),'0.000');
  assert.equal(await page.locator('#expertise').getAttribute('data-lit-branches'),'0');
}

await mkdir(output,{recursive:true});
const browser=await chromium.launch();
try {
  const context=await browser.newContext({viewport:desktop});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await ready(page);
  await verifyContent(page);
  const frameP95=await reviewHero(page);
  await reviewAbout(page);
  await reviewBranches(page);
  await verifyLater(page,snapshot,'07-desktop');
  await verifyMarkets(page);
  await verifyAxe(page);
  await reviewResponsive(browser,{ready,seek,snapshot});
  await reviewReducedMotion(browser,{origin,desktop});
  await reviewWithoutScripts(browser,{origin,desktop});
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({frameP95Ms:frameP95,renderer:'Headless Chromium',desktop,views:22},null,2));
} finally {
  await browser.close();
}
