import { z } from 'zod';
import { evidenceSchema, publishClaims } from './publication';

const text = z.string().trim().min(1);
const asset = z.string().regex(/^\/scenes\/[a-z0-9-]+\.(?:webp|avif|png|svg)$/);
const base = z.object({id:z.string().regex(/^[a-z][a-z0-9-]*$/),title:text,text,isPermitted:z.boolean(),scope:text});
const entry = z.discriminatedUnion('kind',[
  base.extend({kind:z.literal('partner'),role:text,cooperation:text,logo:asset.optional()}),
  base.extend({kind:z.literal('manufacturer'),country:text,facility:text,logo:asset,image:asset}),
  base.extend({kind:z.literal('metric'),value:z.number().finite().nonnegative()}),
  base.extend({kind:z.literal('case'),market:text,services:z.array(text).min(1),approach:text,outcome:text,isConfidentialityApproved:z.boolean()}),
]);
export type Credibility = z.infer<typeof entry>;

export function validateCredibility(input: unknown, proof: unknown): readonly Credibility[] {
  const records = z.array(entry).parse(input);
  const evidence = z.array(evidenceSchema).parse(proof);
  const visible = new Set(publishClaims(records,evidence).map((item)=>item.id));
  return records.filter((item)=>item.isPermitted && visible.has(item.id)
    && (item.kind!=='case'||item.isConfidentialityApproved));
}
