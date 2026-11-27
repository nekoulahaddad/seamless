import { expect, test } from '@playwright/test';

test('discovery and legal pages are present in the initial HTML',async({browser,request})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toHaveText(/Connecting Pharmaceutical Innovation/);
  await page.getByRole('link',{name:'Explore Our Expertise'}).click();
  await expect(page).toHaveURL(/#expertise$/);
  await expect(page.locator('.service-panel')).toHaveCount(6);
  await page.getByRole('navigation',{name:'Primary'}).getByRole('link',{name:'Our Markets'}).click();
  await expect(page).toHaveURL(/#markets$/);
  for (const route of ['/privacy/','/terms/','/robots.txt','/sitemap.xml']) {
    expect((await request.get(route)).ok()).toBe(true);
  }
  const home=await (await request.get('/')).text();
  expect(home).toContain('rel="canonical"');
  expect(home).toContain('property="og:title"');
  expect(home).toContain('noindex, nofollow');
  await context.close();
});
