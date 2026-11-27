import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { loadEnv } from 'vite';
import { verifyAddress, type AllowlistedDisclosure } from './audit-output.ts';

const files = (path: string): string[] => readdirSync(path,{withFileTypes:true})
  .flatMap((entry)=> entry.isDirectory() ? files(join(path,entry.name)) : [join(path,entry.name)]);
const configSchema = z.object({
  alias:z.email(),
  disclosure:z.object({status:z.enum(['none','required']),locations:z.array(
    z.object({path:z.string(),elementId:z.string(),count:z.literal(1)}),
  )}),
});

type AuditConfig = Readonly<{ alias:string; locations:readonly AllowlistedDisclosure[] }>;
function loadAuditConfig(): AuditConfig {
  const home = readFileSync('dist/index.html','utf8');
  if (home.includes('noindex, nofollow')) {
    const address=z.email().safeParse(loadEnv('production',process.cwd(),'SEAMLESS_').SEAMLESS_CONTACT_ALIAS?.trim());
    return {alias:address.success?address.data:'team@seamless.example',locations:[]};
  }
  const path = process.env.SEAMLESS_RELEASE_CONFIG;
  if (!path) throw new AuditError('Release audit requires the private input.');
  const raw = JSON.parse(readFileSync(path,'utf8')) as unknown;
  const parsed = configSchema.safeParse(raw);
  if (!parsed.success) throw new AuditError('Audit configuration is invalid.');
  return { alias:parsed.data.alias,locations:parsed.data.disclosure.locations };
}

class AuditError extends Error {}

function inspect(path: string, config: AuditConfig): void {
  const file = path.replaceAll('\\','/').slice(5);
  const content = readFileSync(path,'utf8');
  const isForbidden = /\.(?:mp4|webm|mov|avi|m4v|env|pem|key)$/i.test(file);
  const exposesSecret = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(content);
  if (isForbidden || exposesSecret || !verifyAddress({file,content,...config})) {
    throw new AuditError(`Unexpected private or prohibited output in ${file}`);
  }
}

const config = loadAuditConfig();
for (const path of files('dist')) inspect(path,config);
console.log('Static output and address disclosure audit passed.');
