import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from 'playwright';
import { verifyContent } from './review-chapters.mjs';

const origin=process.env.SEAMLESS_PROTO_URL??'http://127.0.0.1:4181/';

async function check(engine){
  const browser=await engine.launch();
  try{
    const page=await browser.newPage({viewport:{width:1280,height:820}});
    const failures=[];
    page.on('pageerror',error=>failures.push(error.message));
    await page.goto(origin);
    await page.locator('.hero-art[data-vial-ready]').waitFor({state:'attached'});
    await verifyContent(page);
    await page.locator('.region-art img').scrollIntoViewIfNeeded();
    await page.locator('.region-art img').evaluate(image=>image.decode());
    await page.evaluate(()=>scrollTo(0,0));
    await page.locator('.journey-path[data-visible-length="0"]').waitFor({state:'attached'});
    assert.deepEqual(failures,[]);
    return {engine:engine.name(),status:'pass'};
  }finally{
    await browser.close();
  }
}

const results=[];
for(const engine of [chromium,firefox,webkit]) results.push(await check(engine));
console.log(JSON.stringify(results,null,2));
