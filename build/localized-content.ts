import type { PageRecord } from './page-schema';

export function localizedPage(
  pages: readonly PageRecord[], id: string, locale: string,
): PageRecord | undefined {
  return pages.find((page) => page.id === id && page.locale === locale);
}
