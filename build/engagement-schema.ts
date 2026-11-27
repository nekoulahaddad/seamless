import { z } from 'zod';

export const engagementSchema = z.object({
  event: z.enum(['service-view', 'market-view', 'case-study-view', 'story-complete']),
  contentId: z.string().regex(/^[a-z][a-z0-9-]*$/).max(48),
}).strict();
