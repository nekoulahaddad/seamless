import { expect, test } from '@playwright/test';
test('the preview measures neither content views nor protected contact actions',async({page})=>{
  const external:string[]=[];
  page.on('request',(request)=>{if(!request.url().startsWith('http://127.0.0.1:4173/')) external.push(request.url());});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.locator('#markets').scrollIntoViewIfNeeded();
  await page.getByRole('button',{name:'Reveal Email Address'}).click();
  await expect(page.locator('#email-address')).toBeVisible();
  expect(external).toEqual([]);
});
