interface Anchor { node: HTMLElement; offset: number }

export function captureSection(): Anchor | undefined {
  const center = innerHeight / 2;
  const node = Array.from(document.querySelectorAll<HTMLElement>('main > section')).find((section)=>{
    const rect=section.getBoundingClientRect();
    return rect.top<=center && rect.bottom>center;
  });
  if (!node) return undefined;
  return {node,offset:node.getBoundingClientRect().top};
}

export function restoreSection(anchor: Anchor | undefined): void {
  if (!anchor) return;
  const delta=anchor.node.getBoundingClientRect().top-anchor.offset;
  if (Math.abs(delta)>1) window.scrollBy({top:delta,behavior:'instant'});
}
