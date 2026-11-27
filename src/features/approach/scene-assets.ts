export function refreshOnSceneLoad(callback: () => void): () => void {
  const items = Array.from(document.querySelectorAll<HTMLImageElement>('[data-scene] img')).filter((image) => !image.complete);
  items.forEach((image) => image.addEventListener('load',callback,{once:true}));
  return () => items.forEach((image) => image.removeEventListener('load',callback));
}
