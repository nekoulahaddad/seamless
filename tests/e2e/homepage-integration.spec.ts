import { expect, test } from '@playwright/test';

const expected=['hero','connections','about','expertise','approach','markets','why-work-with-us','partners','finale','contact'];
for(const javaScriptEnabled of [true,false]) {
  test(`homepage order is stable with scripts ${javaScriptEnabled ? 'enabled' : 'disabled'}`,async({browser})=>{
    const context=await browser.newContext({javaScriptEnabled,reducedMotion:'reduce'});
    const page=await context.newPage();
    await page.goto('/');
    expect(await page.locator('main > section').evaluateAll((nodes)=>nodes.map((node)=>node.id))).toEqual(expected);
    await expect(page.locator('#connections')).toContainText('Target markets:');
    await expect(page.locator('#why-work-with-us')).toContainText('Pharmaceutical specialization');
    await expect(page.locator('#contact')).toContainText('email controls require browser scripts');
    await context.close();
  });
}
