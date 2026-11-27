import { existsSync } from 'node:fs';

export interface FooterConfig { alias:string|undefined; privacy:string|undefined; terms:string|undefined }

export function closingConfig(env:NodeJS.ProcessEnv):FooterConfig {
  return {
    alias:encodeAlias(env.SEAMLESS_CONTACT_ALIAS),
    privacy:pdfLink(env.SEAMLESS_PRIVACY_PDF),
    terms:pdfLink(env.SEAMLESS_TERMS_PDF),
  };
}

function encodeAlias(value:string|undefined):string|undefined {
  if(!value||!/^[\w.!#$%&'*+/=^\x60{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)+$/i.test(value)) return undefined;
  return Buffer.from(value).toString('base64');
}

function pdfLink(name:string|undefined):string|undefined {
  if(!name||!/^[a-z\d][a-z\d_.-]*\.pdf$/i.test(name)) return undefined;
  if(!existsSync(new URL('../public/legal/'+name,import.meta.url))) return undefined;
  return '/legal/'+name;
}
