import { isColorSchemePref, resolveColorScheme } from '../scheme';
import { SHEET, THEMES } from '../themes';

describe('resolveColorScheme', () => {
  it('uses the explicit choice', () => {
    expect(resolveColorScheme('light', 'dark')).toBe('light');
    expect(resolveColorScheme('dark', 'light')).toBe('dark');
  });

  it('follows the system when asked', () => {
    expect(resolveColorScheme('system', 'light')).toBe('light');
    expect(resolveColorScheme('system', 'dark')).toBe('dark');
  });

  it('falls back to dark when the system is unknown', () => {
    expect(resolveColorScheme('system', null)).toBe('dark');
    expect(resolveColorScheme('system', undefined)).toBe('dark');
  });
});

describe('isColorSchemePref', () => {
  it('accepts known values only', () => {
    expect(isColorSchemePref('system')).toBe(true);
    expect(isColorSchemePref('dark')).toBe(true);
    expect(isColorSchemePref('Menthe')).toBe(false);
    expect(isColorSchemePref(null)).toBe(false);
  });
});

describe('THEMES', () => {
  it('defines the same tokens in both schemes', () => {
    expect(Object.keys(THEMES.light).sort()).toEqual(Object.keys(THEMES.dark).sort());
  });
});

describe('SHEET', () => {
  it('lifts sheets above the screen background in both schemes', () => {
    expect(SHEET.dark.bg).not.toBe(THEMES.dark.bg);
    expect(SHEET.light.bg).not.toBe(THEMES.light.bg);
  });

  it('only overrides existing tokens', () => {
    for (const scheme of ['dark', 'light'] as const) {
      for (const key of Object.keys(SHEET[scheme])) expect(THEMES[scheme]).toHaveProperty(key);
    }
  });
});
