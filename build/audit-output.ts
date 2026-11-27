export interface AllowlistedDisclosure {
  path: string; elementId: string; count: number;
}
type AuditInput = Readonly<{ file: string; content: string; alias: string; locations: readonly AllowlistedDisclosure[] }>;

function occurrences(text: string, value: string): number {
  return text.toLowerCase().split(value.toLowerCase()).length - 1;
}
export function verifyAddress(input: AuditInput): boolean {
  const html = input.content;
  const hits = occurrences(html,input.alias);
  const locations = input.locations.filter((entry)=>`${entry.path.slice(1)}index.html` === input.file);
  let allowed = 0;
  for (const loc of locations) {
    if (!/^[a-z][a-z0-9-]*$/.test(loc.elementId) || loc.count !== 1) return false;
    const nodes = [...html.matchAll(new RegExp(`<p id="${loc.elementId}">([^<]*)</p>`,'g'))];
    const text = nodes[0]?.[1] ?? '';
    if (nodes.length !== 1 || occurrences(text,input.alias)!==loc.count) return false;
    allowed += loc.count;
  }
  return hits === allowed;
}
