import assert from 'node:assert/strict';

const fixtureRecipient='capture@example.invalid';

export async function verifyConfiguredContact(browser,origin){
  for(const width of [1440,390]) await verifyContactAtWidth(browser,origin,width);
}

async function verifyContactAtWidth(browser,origin,width){
  const isMobile=width===390;
  const context=await browser.newContext({viewport:{width,height:844},hasTouch:isMobile,isMobile});
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  const page=await context.newPage();
  await interceptMailto(page);
  await page.goto(origin);
  const found=await page.locator('[data-alias]').getAttribute('data-alias');
  const recipient=found ? Buffer.from(found,'base64').toString('utf8') : fixtureRecipient;
  if(!found){
    await configureContact(page,origin,recipient);
    await page.reload();
  }
  const email=page.getByRole('link',{name:'Email Us'});
  const copy=page.getByRole('button',{name:'Copy Email Address'});
  assert.equal(await email.getAttribute('href'),null);
  if(isMobile) await email.locator('.contact-icon').tap();
  else await email.getByText('Email Us').click();
  assert.equal(await page.evaluate(()=>window.__mailtoDestination),'mailto:'+recipient);
  if(isMobile) await copy.getByText('Copy Email Address').tap();
  else await copy.locator('.contact-icon').click();
  await assertClipboard(page,recipient);
  await denyClipboard(page);
  await copy.press('Enter');
  await page.getByText('Could not copy email. Try again.',{exact:true}).waitFor();
  assert.equal(await page.locator('#contact').innerText().then(text=>text.includes(recipient)),false);
  await context.close();
}

async function configureContact(page,origin,recipient){
  const encoded=Buffer.from(recipient).toString('base64');
  await page.route(origin,async route=>{
    const response=await route.fetch();
    const html=(await response.text()).replace(/data-alias="[^"]*"/,`data-alias="${encoded}"`);
    assert.equal(html.includes(recipient),false);
    await route.fulfill({response,body:html});
  });
}

async function interceptMailto(page){
  await page.addInitScript(()=>{
    window.__mailtoDestination='';
    document.addEventListener('click',(event)=>{
      if(!(event.target instanceof Element)) return;
      const link=event.target.closest('a[href^="mailto:"]');
      if(!link) return;
      window.__mailtoDestination=link.href;
      event.preventDefault();
    });
  });
}

async function assertClipboard(page,recipient){
  const feedback=page.locator('[data-copied] .contact-check');
  await feedback.waitFor();
  assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),recipient);
  assert.equal(await page.locator('.contact-status').textContent(),'');
  assert.equal(await page.locator('[data-copy-announcement]').textContent(),'Copied to clipboard.');
  await feedback.waitFor({state:'hidden',timeout:2200});
}

async function denyClipboard(page){
  await page.evaluate(()=>{
    Object.defineProperty(navigator.clipboard,'writeText',{
      configurable:true,value:()=>Promise.reject(new DOMException('Test permission denied','NotAllowedError')),
    });
  });
}
