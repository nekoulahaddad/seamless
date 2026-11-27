import { expect, test } from '@playwright/test';
test('five market links are selectable and unapproved publication sections stay absent',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#markets');
  const links=page.getByRole('navigation',{name:'Target countries'}).getByRole('link');
  await expect(links).toHaveCount(5);
  for (const link of await links.all()) {
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(link).toHaveAttribute('aria-current','location');
  }
  await page.locator('#connections').getByRole('link',{name:'Open Syria market'}).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#market-syria$/);
  await expect(page.locator('#connections')).toContainText('Dubai, UAE, Saudi Arabia');
  await expect(page.locator('#case-studies,#track-record,#manufacturers')).toHaveCount(0);
});
