import { expect, test } from '@playwright/test';

test('the application sends no analytics or contact requests',async({page})=>{
  const external:string[]=[];
  page.on('request',(request)=>{if(!request.url().startsWith('http://127.0.0.1:4173/')) external.push(request.url());});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.locator('#markets').scrollIntoViewIfNeeded();
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('.contact-status')).toBeEmpty();
  expect(external).toEqual([]);
});
