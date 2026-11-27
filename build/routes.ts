import { z } from 'zod';
import { pageSchema, type PageRecord } from './page-schema';
import { BuildError } from './build-error';

export const pagePaths = ['/', '/privacy/', '/terms/'] as const;

export function validateRoutes(input: unknown): readonly PageRecord[] {
  const parsed = z.array(pageSchema).parse(input);
  const paths = new Set(parsed.map((page) => page.path));
  const ids = new Set(parsed.map((page) => page.id));
  if (paths.size !== parsed.length || ids.size !== parsed.length) throw new BuildError('Duplicate page route or ID.');
  if (paths.size !== pagePaths.length || pagePaths.some((path) => !paths.has(path))) {
    throw new BuildError('Build must contain the homepage and both legal routes.');
  }
  return parsed;
}

export function outputFor(path: string): string { return `${path.slice(1)}index.html`; }
