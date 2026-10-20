export const COLOR_SCHEME_PREFS = ['system', 'light', 'dark'] as const;
export type ColorSchemePref = (typeof COLOR_SCHEME_PREFS)[number];
export type ColorScheme = 'light' | 'dark';

export function isColorSchemePref(value: unknown): value is ColorSchemePref {
  return COLOR_SCHEME_PREFS.includes(value as ColorSchemePref);
}

// Dark is the brand default when the system gives no answer.
export function resolveColorScheme(
  pref: ColorSchemePref,
  system: string | null | undefined,
): ColorScheme {
  if (pref !== 'system') return pref;
  return system === 'light' ? 'light' : 'dark';
}
