import assert from 'node:assert/strict';
import { verifyVial } from './review-vial.mjs';
import { verifyAxe, verifyContent, verifyLater } from './review-chapters.mjs';

export async function reviewResponsive(browser,{ready,seek,snapshot}) {
  const phone=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
  await ready(phone);
  assert.equal(await phone.evaluate(()=>document.documentElement.scrollWidth),390);
  await snapshot(phone,'05-phone');
  await verifyVial(phone,'06-phone-vial',seek,snapshot);
  await seek(phone,'about',.77);
  await phone.waitForFunction(()=>Number(document.querySelector('.scan-beam').style.opacity)>.2);
  assert.equal(await phone.evaluate(()=>document.documentElement.scrollWidth),390);
  await phone.locator('.mobile-menu summary').click();
  await phone.getByRole('link',{name:'Expertise',exact:true}).click();
  assert.equal(new URL(phone.url()).hash,'#expertise');
  assert.equal(await phone.locator('[data-service]').count(),6);
  await verifyLater(phone,snapshot,'08-phone');
  await verifyContent(phone);
  await phone.close();
}

export async function reviewReducedMotion(browser,{origin,desktop}) {
  const reducedContext=await browser.newContext({viewport:desktop,reducedMotion:'reduce'});
  const reduced=await reducedContext.newPage();
  await reduced.goto(origin,{waitUntil:'networkidle'});
  assert.equal(await reduced.locator('[data-vial-ready], [data-model] svg').count(),0);
  assert.equal(await reduced.locator('.journey-path').isVisible(),false);
  assert.equal(await reduced.locator('[data-service]').count(),6);
  assert.equal(await reduced.locator('.site-header button').count(),0);
  await reduced.emulateMedia({reducedMotion:'no-preference'});
  await reduced.locator('html[data-motion="on"]').waitFor({state:'attached'});
  await reduced.emulateMedia({reducedMotion:'reduce'});
  await reduced.locator('html[data-motion="on"]').waitFor({state:'detached'});
  await verifyContent(reduced);
  await verifyAxe(reduced);
  await reducedContext.close();
}

export async function reviewWithoutScripts(browser,{origin,desktop}) {
  const still=await browser.newPage({viewport:desktop,javaScriptEnabled:false});
  await still.goto(origin,{waitUntil:'networkidle'});
  assert.equal(await still.locator('html[data-motion]').count(),0);
  assert.equal(await still.locator('.site-header button').count(),0);
  assert.equal(await still.locator('[data-service]').count(),6);
  assert.ok(await still.locator('.hero-poster img').isVisible());
  await verifyContent(still);
  await still.locator('#market-syria summary').click();
  assert.ok(await still.locator('#market-syria a[href="#contact"]').isVisible());
  await still.close();
}

