import { expect, test } from '@playwright/test';

test('desktop timeline illuminates the stages in both directions',async({page})=>{
  await page.setViewportSize({width:1440,height:950});
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion','on');
  const seek=async(fraction:number)=>{
    await page.locator('#approach').evaluate((node,position)=>{
      const top=window.scrollY+node.getBoundingClientRect().top;
      window.scrollTo(0,top-window.innerHeight*position);
    },fraction);
  };
  await seek(.02);
  await expect(page.locator('#stage-facilitate')).toHaveClass(/is-reached/);
  await seek(.52);
  await expect(page.locator('#stage-facilitate')).not.toHaveClass(/is-reached/);
  await expect(page.locator('#stage-understand')).toHaveClass(/is-reached/);
  await expect(page.getByRole('button',{name:/pause motion|stop motion/i})).toHaveCount(0);
  await expect(page.locator('.stage-list li')).toHaveCount(5);
});
