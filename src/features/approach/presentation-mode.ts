export type ActiveMode = 'full' | 'vertical';
export type PresentationMode = ActiveMode | 'static';

export function presentationMode(isReduced: boolean, hasWidePrecision: boolean): PresentationMode {
  if (isReduced) return 'static';
  if (hasWidePrecision) return 'full';
  return 'vertical';
}
