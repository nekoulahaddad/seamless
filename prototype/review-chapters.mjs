import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';

const sections=['hero','about','expertise','approach','markets','why-work-with-us','contact'];

export async function verifyContent(page){
  assert.deepEqual(await page.locator('main > section').evaluateAll(items=>items.map(item=>item.id)),sections);
  assert.equal(await page.locator('.service-icon, .branch-tip, .services svg, video, form, .stage-rail, .market-directory').count(),0);
  assert.equal(await page.locator('[data-stage]').count(),5);
  assert.equal(await page.locator('#markets .region-art img').count(),1);
  assert.equal(await page.getByText('Connections are illustrative.',{exact:true}).count(),0);
  assert.equal(await page.locator('#markets :is(a,button,canvas,svg,[tabindex])').count(),0);
  assert.match(await page.locator('.region-legend').innerText(),/Syria, Iraq, Yemen, Libya, Tunisia/);
  assert.equal(await page.locator('.contact-status').innerText(),'');
  assert.equal(await page.locator('a[href^="#"]').evaluateAll(links=>links.filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).length),0);
  assert.equal(await page.locator('html').evaluate(el=>el.scrollWidth),page.viewportSize().width);
  await verifyFooter(page);
}

async function verifyFooter(page){
  const credit=page.getByRole('link',{name:'NMAX'});
  assert.equal(await credit.getAttribute('href'),'https://nmax.tech');
  assert.equal(await credit.getAttribute('target'),'_blank');
  assert.equal(await credit.getAttribute('rel'),'noopener noreferrer');
  assert.match(await page.locator('.dev-credit').innerText(),/Crafted with ♡ by\s+NMAX/);
  const positions=await page.locator('.footer-signoff').evaluate(el=>Array.from(el.children,node=>node.getBoundingClientRect().toJSON()));
  const [copyright,nmax]=positions;
  if(page.viewportSize().width<=900) assert.ok(nmax.top>=copyright.bottom);
  else assert.ok(nmax.left>=copyright.right);
}

export async function verifyLater(page,snapshot,prefix){
  const path=page.locator('.journey-path');
  await scrollToProgress(page,'approach',.04);
  const early=await page.locator('[data-stage].is-reached').count();
  await scrollToProgress(page,'approach',.88);
  await page.locator('#stage-facilitate.is-reached').waitFor();
  const later=Number(await path.getAttribute('data-visible-length'));
  await snapshot(page,prefix+'-approach');
  await scrollToProgress(page,'approach',.04);
  assert.ok(await page.locator('[data-stage].is-reached').count()<=early);
  assert.ok(Number(await path.getAttribute('data-visible-length'))<later);
  await verifyMapProgress(page,snapshot,prefix);
  await scrollToProgress(page,'contact',.38);
  await snapshot(page,prefix+'-contact-footer');
}

async function verifyMapProgress(page,snapshot,prefix){
  const map=page.locator('#markets .region-art img');
  const path=page.locator('.journey-path');
  await scrollToProgress(page,'markets',.02);
  const initial=await map.evaluate(image=>image.currentSrc);
  const start=Number(await path.getAttribute('data-visible-length'));
  await scrollToProgress(page,'markets',.70);
  await map.evaluate(image=>image.decode());
  assert.equal(await map.evaluate(image=>image.currentSrc),initial);
  assert.ok(Number(await path.getAttribute('data-visible-length'))>start);
  await snapshot(page,prefix+'-regional-connectivity');
  await scrollToProgress(page,'markets',.02);
  assert.equal(Number(await path.getAttribute('data-visible-length')),start);
}

export async function verifyAxe(page){
  const {violations}=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  assert.deepEqual(violations.map(({id,nodes})=>({id,targets:nodes.map(({target})=>target)})),[]);
}

async function scrollToProgress(page,id,fraction){
  await page.locator('#'+id).evaluate(async (el,position)=>{
    const box=el.getBoundingClientRect();
    const top=box.top+scrollY;
    scrollTo(0,top+box.height*position-innerHeight*.42);
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  },fraction);
}
