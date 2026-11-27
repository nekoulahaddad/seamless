import { expect, test } from '@playwright/test';

const expected=['hero','about','expertise','approach','markets','why-work-with-us','contact'];
for(const javaScriptEnabled of [true,false]) {
  test(`approved homepage is available with scripts ${javaScriptEnabled?'enabled':'disabled'}`,async({browser})=>{
    const context=await browser.newContext({javaScriptEnabled,reducedMotion:'reduce'});
    const page=await context.newPage();
    await page.goto('/');
    expect(await page.locator('main > section').evaluateAll(nodes=>nodes.map(node=>node.id))).toEqual(expected);
    await expect(page.locator('#hero h1')).toContainText('Connecting Pharmaceutical Innovation');
    await expect(page.locator('#markets')).toContainText('Strategic Network');
    await expect(page.locator('#why-work-with-us')).toContainText('Pharmaceutical specialization');
    await expect(page.locator('#contact')).toContainText('Copy Email Address');
    await expect(page.locator('footer').getByRole('link',{name:'NMAX'})).toHaveAttribute('target','_blank');
    await expect(page.locator('footer').getByRole('link',{name:/Privacy Policy/})).toBeVisible();
    await context.close();
  });
}
