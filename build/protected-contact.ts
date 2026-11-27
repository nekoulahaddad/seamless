import { BuildError } from './build-error';
import { outputFor } from './routes';
import type { SiteInput, DisclosureEntry } from './site-input';

export function encodeAlias(alias: string): string {
  return Buffer.from(alias, 'utf8').toString('base64');
}

export function validateDisclosures(input: SiteInput): readonly DisclosureEntry[] {
  const keys = new Set<string>();
  for (const item of input.disclosure.locations) {
    const key = `${outputFor(item.path)}#${item.elementId}`;
    if (keys.has(key)) throw new BuildError('Duplicate legal disclosure location.');
    keys.add(key);
    if (item.text.toLowerCase().split(input.alias.toLowerCase()).length - 1 !== item.count) {
      throw new BuildError('Required legal disclosure has an incorrect address count.');
    }
  }
  return input.disclosure.locations;
}
