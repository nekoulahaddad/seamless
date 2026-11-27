import { z } from 'zod';
import { BuildError } from './build-error';

const service = z.object({
  id:z.string().regex(/^[a-z-]+$/), name:z.string().min(1), summary:z.string().min(1),
  benefit:z.string().min(1), visual:z.string().regex(/^[A-Za-z0-9 .,-]+$/),
});
export type Service = z.infer<typeof service>;
const expected = ['portfolio','strategy','regulatory','distribution','development','facility'];
export function validateServices(input: unknown): readonly Service[] {
  const parsed = z.array(service).length(expected.length).parse(input);
  if (expected.some((id,index) => parsed[index]?.id !== id)) throw new BuildError('Approved service order or ID changed.');
  return parsed;
}
