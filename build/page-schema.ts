import { z } from 'zod';

export const pageSchema = z.object({
  id: z.string().min(1), locale: z.string().min(2),
  direction: z.enum(['ltr', 'rtl']), path: z.string().regex(/^\/(?:[a-z-]+\/)*$/),
  title: z.string().min(1), description: z.string().min(1),
  socialImage: z.string().startsWith('/'), sections: z.array(z.string().min(1)),
});
export type PageRecord = z.infer<typeof pageSchema>;
