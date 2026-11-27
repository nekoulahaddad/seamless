import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { z } from 'zod';

export function cinematicEnv(mode:string):NodeJS.ProcessEnv {
  return loadEnv(mode,fileURLToPath(new URL('../',import.meta.url)),'SEAMLESS_');
}

export function previewAlias(env:NodeJS.ProcessEnv):string|undefined {
  const parsed=z.email().safeParse(env.SEAMLESS_CONTACT_ALIAS?.trim());
  return parsed.success?parsed.data:undefined;
}
