import { expect, test } from '@playwright/test';
test('desktop timeline tracks ordered progress forward and backward',async({page})=>{
  await page.setViewportSize({width:1440,height:950});
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion','full');
  const goTo=async(id:string)=>{
    await page.locator(`#${id}`).evaluate((node)=>window.scrollTo({
      top:window.scrollY+node.getBoundingClientRect().top-150,behavior:'instant',
    }));
    await expect(page.locator('#approach')).toHaveAttribute('data-active-stage',id);
  };
  await goTo('prepare');
  await goTo('facilitate');
  await goTo('evaluate');
  await page.getByRole('button',{name:'Pause Motion'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion','static');
  await expect(page.locator('.journey-stages li')).toHaveCount(5);
});
