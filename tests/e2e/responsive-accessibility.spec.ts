import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('phone layout keeps actions reachable without horizontal overflow',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion','static');
  await page.getByRole('button',{name:'Menu'}).click();
  await expect(page.getByRole('navigation',{name:'Primary'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button',{name:'Menu'})).toBeFocused();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(results.violations.map(({id,nodes})=>({id,nodes:nodes.map((n)=>n.target)}))).toEqual([]);
  await context.close();
});
