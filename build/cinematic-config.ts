import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { z } from 'zod';
import type { FooterLinks } from '../src/pages/home/chapters/footer';

export function cinematicEnv(mode:string):NodeJS.ProcessEnv {
  return loadEnv(mode,fileURLToPath(new URL('../',import.meta.url)),'SEAMLESS_');
}

export function previewAlias(env:NodeJS.ProcessEnv):string|undefined {
  const parsed=z.email().safeParse(env.SEAMLESS_CONTACT_ALIAS?.trim());
  return parsed.success?parsed.data:undefined;
}

export function footerLinks(env:NodeJS.ProcessEnv,isApplication:boolean):FooterLinks {
  return {
    privacy:pdfLink(env.SEAMLESS_PRIVACY_PDF)??(isApplication?'/privacy/':undefined),
    terms:pdfLink(env.SEAMLESS_TERMS_PDF)??(isApplication?'/terms/':undefined),
  };
}

function pdfLink(name:string|undefined):string|undefined {
  if(!name||!/^[a-z\d][a-z\d_.-]*\.pdf$/i.test(name)) return undefined;
  if(!statSync(new URL('../assets/legal/'+name,import.meta.url),{throwIfNoEntry:false})?.isFile()) return undefined;
  return '/legal/'+name;
}
