export function motionPreferences(): { reduced: MediaQueryList; desktop: MediaQueryList } {
  return {
    reduced:matchMedia('(prefers-reduced-motion: reduce)'),
    desktop:matchMedia('(min-width: 1050px) and (hover: hover) and (pointer: fine)'),
  };
}
