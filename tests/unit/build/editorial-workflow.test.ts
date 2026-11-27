import { expect, it, vi } from 'vitest';
import { engagementSchema } from '../../../build/engagement-schema';
import { localizedPage } from '../../../build/localized-content';
import { engagementSink } from '../../../src/features/credibility/content-engagement';

it('keeps analytics off by default and rejects contact and personal data',()=>{
  expect(engagementSink(false,vi.fn())).toBeUndefined();
  expect(engagementSchema.safeParse({event:'contact',contentId:'home'}).success).toBe(false);
  expect(engagementSchema.safeParse({event:'market-view',contentId:'iraq',email:'person@example.invalid'}).success).toBe(false);
  expect(engagementSchema.safeParse({event:'market-view',contentId:'iraq'}).success).toBe(true);
});
it('keeps future locales explicit',()=>{
  const pages=[{id:'home',locale:'ar',direction:'rtl' as const,path:'/ar/',title:'Preview',description:'Preview',socialImage:'/a.svg',sections:['main']}];
  expect(localizedPage(pages,'home','ar')?.direction).toBe('rtl');
  expect(localizedPage(pages,'home','en')).toBeUndefined();
});
