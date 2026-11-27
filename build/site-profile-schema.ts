import { z } from 'zod';

const text = z.string().trim().min(1);
const localPath = z.string().regex(/^\/[\w./-]+$/).refine((path) => !path.includes('..'));
export const profileSchema = z.object({
  name: text, mission: text, positioning: text, logo: localPath,
  origin: z.url().refine((value) => {
    const url = new URL(value);
    return url.protocol === 'https:' && url.origin === value;
  }),
  locale: z.literal('en'),
  navigation: z.array(z.object({ id: z.string().regex(/^[a-z][a-z-]*$/), label: text })),
  privacy: text, terms: text, contactRef: z.literal('official-alias'),
  isPublicationApproved: z.boolean(),
});
export type SiteProfile = z.infer<typeof profileSchema>;
