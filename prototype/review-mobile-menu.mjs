import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium, firefox, webkit } from 'playwright';

const origin=process.env.SEAMLESS_PROTO_URL??'http://127.0.0.1:4181/';
const directory='.generated/mobile-navigation';
const links=['About','Expertise','Our Approach','Our Markets','Our Network','Why Work With Us','Contact','Book a Consultation'];

async function check(browser,width,height,screenshot){
  const page=await browser.newPage({viewport:{width,height},hasTouch:true});
  await page.goto(origin);
  const button=page.getByRole('button',{name:'Open menu'});
  const dialog=page.getByRole('dialog',{name:'Site navigation'});
  await button.click();
  const close=dialog.getByRole('button',{name:'Close menu'});
  assert.equal(await close.evaluate(el=>el===document.activeElement),true);
  assert.deepEqual(await dialog.locator('nav a').allTextContents().then(values=>values.map(value=>value.trim())),links);
  assert.equal(await dialog.evaluate(el=>el.scrollWidth),width);
  assert.equal(await dialog.evaluate(el=>el.getBoundingClientRect().width),width);
  if(screenshot) await page.screenshot({path:`${directory}/menu-${width}x${height}.png`});
  await close.press('Escape');
  await dialog.waitFor({state:'hidden'});
  await page.waitForFunction(()=>document.querySelector('.mobile-menu-trigger')===document.activeElement);
  await button.click();
  await close.click();
  await dialog.waitFor({state:'hidden'});
  await button.click();
  await dialog.getByRole('link',{name:'Book a Consultation'}).click();
  assert.equal(new URL(page.url()).hash,'#contact');
  assert.equal(await dialog.isVisible(),false);
  await page.close();
}

await mkdir(directory,{recursive:true});
for(const engine of [chromium,firefox,webkit]){
  const browser=await engine.launch();
  try{
    const sizes=engine===chromium?[[360,800],[390,844],[430,932],[844,390]]:[[390,844]];
    for(const [width,height] of sizes) await check(browser,width,height,engine===chromium);
    console.log(`${engine.name()}: menu passed at ${sizes.map(size=>size.join('×')).join(', ')}`);
  }finally{
    await browser.close();
  }
}
