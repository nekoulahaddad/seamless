import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { profileSchema } from './site-profile-schema';
import { BuildError } from './build-error';
import { fixtureProfile } from '../content/site-fixture';

export const disclosureEntry = z.object({
  path: z.enum(['/', '/privacy/', '/terms/']),
  elementId: z.string().regex(/^[a-z][a-z0-9-]*$/), count: z.literal(1),
  rationale: z.string().min(1), approvalReference: z.string().min(1),
  text: z.string().min(1),
});
const disclosure = z.discriminatedUnion('status', [
  z.object({ status: z.literal('pending'), locations: z.tuple([]) }),
  z.object({ status: z.literal('none'), locations: z.tuple([]) }),
  z.object({ status: z.literal('required'), locations: z.array(disclosureEntry).min(1) }),
]);
const siteInput = z.object({
  profile: profileSchema, alias: z.email(), disclosure, isArtworkApproved: z.boolean(),
});
export type SiteInput = z.infer<typeof siteInput>;
export type DisclosureEntry = z.infer<typeof disclosureEntry>;

export function loadSite(isRelease: boolean): SiteInput {
  if (!isRelease) return siteInput.parse({
    profile: fixtureProfile, alias: 'team@seamless.example',
    disclosure: { status: 'pending', locations: [] }, isArtworkApproved: false,
  });
  const file = process.env.SEAMLESS_RELEASE_CONFIG;
  if (!file) throw new BuildError('Release needs a private company-approved configuration.');
  const result = siteInput.safeParse(JSON.parse(readFileSync(file, 'utf8')) as unknown);
  if (!result.success) throw new BuildError('Release configuration is invalid. Review the documented schema.');
  const input = result.data;
  if (!input.profile.isPublicationApproved || !input.isArtworkApproved || input.disclosure.status === 'pending') {
    throw new BuildError('Company publication, artwork and legal disclosure approvals are required for release.');
  }
  const fixtureHost = (value: string) => /(?:^|\.)(?:example|test|invalid|localhost)$/i.test(value);
  if (fixtureHost(new URL(input.profile.origin).hostname) || fixtureHost(input.alias.split('@')[1] ?? '')) {
    throw new BuildError('Fixture origins and aliases are prohibited in a release build.');
  }
  return input;
}
