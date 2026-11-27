import { expect, test } from '@playwright/test';

test('contact is independent of motion and does not publish the full alias initially',async({page,request})=>{
  expect(await (await request.get('/')).text()).not.toContain('team@seamless.example');
  const requests:string[]=[];
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#contact',{waitUntil:'networkidle'});
  const reveal=page.getByRole('button',{name:'Reveal Email Address'});
  await reveal.focus();
  page.on('request',(request)=>requests.push(request.url()));
  await reveal.press('Enter');
  await expect(page.locator('#email-address')).toHaveText('team@seamless.example');
  await expect(page.getByRole('status')).toContainText('Email address:');
  expect(requests).toEqual([]);
});

test('denied clipboard falls back to selectable text and accessible instructions',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{value:{
    writeText:()=>Promise.reject(new DOMException('Denied','NotAllowedError')),
  }}));
  await page.goto('/#contact');
  await page.getByRole('button',{name:'Copy Email Address'}).click();
  await expect(page.locator('#email-address')).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Select and copy');
});
