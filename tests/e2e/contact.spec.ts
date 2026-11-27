import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

async function openContact(page:Page):Promise<string> {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#contact');
  const configured=await page.locator('[data-alias]').getAttribute('data-alias');
  if(configured) return Buffer.from(configured,'base64').toString('utf8');
  const fixture='capture@example.invalid';
  const encoded=Buffer.from(fixture).toString('base64');
  await page.route('**/',async(route)=>{
    const response=await route.fetch();
    const html=(await response.text()).replace('data-alias=""',`data-alias="${encoded}"`);
    await route.fulfill({response,body:html});
  });
  await page.reload();
  return fixture;
}

test('contact is independent of motion and emits the protected mailto destination',async({page,request})=>{
  await page.addInitScript(()=>{
    document.addEventListener('click',(event)=>{
      if(!(event.target instanceof Element)||!event.target.closest('[href^="mailto:"]')) return;
      event.preventDefault();
    });
  });
  const alias=await openContact(page);
  expect((await (await request.get('/')).text()).includes(alias)).toBe(false);
  const email=page.getByRole('link',{name:'Email Us'});
  await expect(email).not.toHaveAttribute('href',/mailto:/);
  await email.press('Enter');
  expect((await email.getAttribute('href'))==='mailto:'+encodeURIComponent(alias).replace('%40','@')).toBe(true);
});

test('copy confirms success with a check and reports denied clipboard access',async({page})=>{
  await page.addInitScript(()=>{
    Object.defineProperty(navigator,'clipboard',{value:{
      writeText:async(value:string)=>{
        if(document.documentElement.dataset.denyClipboard) throw new DOMException('Denied','NotAllowedError');
        document.documentElement.dataset.testClipboard=value;
      },
    }});
  });
  const alias=await openContact(page);
  const copy=page.getByRole('button',{name:'Copy Email Address'});
  await copy.click();
  await expect(copy.locator('.contact-check')).toBeVisible();
  expect((await page.locator('html').getAttribute('data-test-clipboard'))===alias).toBe(true);
  await expect(page.locator('.contact-status')).toBeEmpty();
  await page.locator('html').evaluate(node=>node.setAttribute('data-deny-clipboard','true'));
  await copy.click();
  await expect(page.locator('.contact-status')).toContainText('Could not copy email');
});
