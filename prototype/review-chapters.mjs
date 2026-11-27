import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';

const sections=['hero','connections','about','expertise','approach','markets','why-work-with-us','partners','finale','contact'];

export async function verifyContent(page){
  assert.deepEqual(await page.locator('main > section').evaluateAll(items=>items.map(item=>item.id)),sections);
  assert.equal(await page.locator('.service-icon, .branch-tip, .services svg, video, form').count(),0);
  assert.equal(await page.locator('[data-stage]').count(),5);
  assert.equal(await page.locator('[data-country-profile]').count(),5);
  assert.equal(await page.locator('a[href^="#"]').evaluateAll(links=>links.filter(a=>!document.getElementById(a.getAttribute("href").slice(1))).length),0);
  assert.equal(await page.locator('html').evaluate(el=>el.scrollWidth),page.viewportSize().width);
}

export async function verifyLater(page,snapshot,prefix){
  const path=page.locator('.journey-path');
  await visit(page,'#stage-evaluate');
  await page.locator('.stage-rail [href="#stage-evaluate"][aria-current="step"]').waitFor();
  const first=Number(await path.getAttribute('data-visible-length'));
  await snapshot(page,prefix+'-approach');
  await visit(page,'#stage-facilitate');
  await page.locator('.stage-rail [href="#stage-facilitate"][aria-current="step"]').waitFor();
  assert.ok(Number(await path.getAttribute('data-visible-length'))>first);
  await visit(page,'#stage-evaluate');
  await page.locator('.stage-rail [href="#stage-evaluate"][aria-current="step"]').waitFor();
  for(const id of ['connections','markets','why-work-with-us','partners','finale']){
    await visit(page,'#'+id+' h2');
    await snapshot(page,prefix+'-'+id);
  }
  await verifyContact(page,snapshot,prefix);
}

async function verifyContact(page,snapshot,prefix) {
  await page.locator('#finale .button').click();
  assert.equal(new URL(page.url()).hash,'#contact');
  const reveal=page.getByRole('button',{name:'Reveal Email Address'});
  assert.equal(await page.locator('#email-address').isVisible(),false);
  await reveal.press('Enter');
  assert.equal(await reveal.getAttribute('aria-expanded'),'true');
  assert.match(await page.locator('#email-address').innerText(),/@seamless\.example$/);
  await snapshot(page,prefix+'-contact');
}

export async function verifyMarkets(page) {
  const market=page.locator('#market-iraq');
  await page.locator('.region-map a[href="#market-iraq"]').press('Enter');
  assert.equal(await market.getAttribute('open'),'');
  assert.ok(await market.getByRole('link',{name:'Discuss market entry for Iraq'}).isVisible());
  assert.equal(await page.locator('#market-iraq summary').evaluate(el=>document.activeElement===el),true);
  await page.locator('#market-yemen summary').click();
  assert.equal(await market.getAttribute('open'),null);
  assert.equal(await page.locator('#market-yemen').getAttribute('open'),'');
}

export async function verifyAxe(page){
  const {violations}=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  assert.deepEqual(violations.map(({id,nodes})=>({id,targets:nodes.map(({target})=>target)})),[]);
}

async function visit(page,selector){
  const heading=page.locator(selector);
  await heading.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
  await heading.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await heading.locator('xpath=ancestor::section[1]').locator('img').evaluateAll(async images=>{
    await Promise.all(images.filter(image=>image.complete&&image.naturalWidth).map(image=>image.decode()));
  });
}
