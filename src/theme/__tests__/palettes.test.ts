import { PALETTES, getSheetTokens, getThemeTokens, isPalette } from '../palettes';
import { SHEET, THEMES } from '../themes';

const SCHEMES = ['dark', 'light'] as const;

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('isPalette', () => {
  it('accepts known values only', () => {
    expect(isPalette('ocean')).toBe(true);
    expect(isPalette('Océan')).toBe(false);
    expect(isPalette(null)).toBe(false);
  });
});

describe('getThemeTokens', () => {
  it('keeps emerald identical to the base themes', () => {
    for (const s of SCHEMES) expect(getThemeTokens('emerald', s)).toEqual(THEMES[s]);
  });

  it('defines every token for each palette and scheme', () => {
    const keys = Object.keys(THEMES.dark).sort();
    for (const p of PALETTES) {
      for (const s of SCHEMES) expect(Object.keys(getThemeTokens(p, s)).sort()).toEqual(keys);
    }
  });

  it('keeps text on the accent readable', () => {
    for (const p of PALETTES) {
      for (const s of SCHEMES) {
        const t = getThemeTokens(p, s);
        expect(contrast(t.accent, t.onAccent)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it('never changes category colors', () => {
    for (const p of PALETTES) {
      for (const s of SCHEMES) {
        const t = getThemeTokens(p, s);
        expect(t.catBlue).toBe(THEMES[s].catBlue);
        expect(t.catGreen).toBe(THEMES[s].catGreen);
      }
    }
  });

  it('returns stable objects', () => {
    expect(getThemeTokens('ocean', 'dark')).toBe(getThemeTokens('ocean', 'dark'));
  });
});

describe('getSheetTokens', () => {
  it('matches the base sheet for emerald', () => {
    for (const s of SCHEMES) expect(getSheetTokens('emerald', s)).toMatchObject(SHEET[s]);
  });

  it('lifts sheets above the screen for each palette', () => {
    for (const p of PALETTES) {
      for (const s of SCHEMES) {
        expect(getSheetTokens(p, s).bg).not.toBe(getThemeTokens(p, s).bg);
        expect(getSheetTokens(p, s).accent).toBe(getThemeTokens(p, s).accent);
      }
    }
  });
});
