import { expect, test } from '@playwright/test';

test('one static regional composition distinguishes target markets and strategic locations',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#markets');
  const markets=page.locator('#markets');
  await expect(markets.getByRole('img')).toHaveCount(1);
  await expect(markets.locator(':is(button,a,canvas,svg)')).toHaveCount(0);
  await expect(markets.locator('.region-legend')).toContainText('Syria, Iraq, Yemen, Libya, Tunisia');
  await expect(page.locator('#partners')).toContainText('Dubai, UAE and Saudi Arabia');
  await expect(page.locator('#connections,#case-studies,#track-record,#manufacturers')).toHaveCount(0);
});
