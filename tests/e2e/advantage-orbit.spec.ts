import { expect, test } from '@playwright/test';

test('the vial is fixed while independent orbit objects cross both depth layers and pause',async({page})=>{
  await page.goto('/');
  const orbit=page.locator('[data-orbit]');
  const object=orbit.locator('[data-orbit-object="2"]');
  const vial=orbit.locator('.stationary-vial');
  await expect(orbit).toHaveAttribute('data-orbit-state','paused');
  await orbit.scrollIntoViewIfNeeded();
  await expect(orbit).toHaveAttribute('data-orbit-state','running');
  await vial.evaluate((image:HTMLImageElement)=>image.decode());
  const before=await vial.boundingBox();
  const original=await object.getAttribute('transform');
  const front=orbit.locator('[data-orbit-front] [data-orbit-object="2"]');
  await expect(front).toHaveCount(1);
  await expect(front).not.toHaveAttribute('transform',original??'');
  await expect(orbit.locator('[data-orbit-rear] [data-orbit-object="2"]')).toHaveCount(1,{timeout:8000});
  expect(await vial.boundingBox()).toEqual(before);
  await expect(orbit.locator('[data-orbit-object]')).toHaveCount(6);
  await page.locator('#hero').scrollIntoViewIfNeeded();
  await expect(orbit).toHaveAttribute('data-orbit-state','paused');
  const paused=await object.getAttribute('transform');
  await orbit.scrollIntoViewIfNeeded();
  await expect(orbit).toHaveAttribute('data-orbit-state','running');
  await expect(object).not.toHaveAttribute('transform',paused??'');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(orbit).toHaveAttribute('data-orbit-state','paused');
  await expect(orbit.locator('.orbit-line').first()).toBeVisible();
});
