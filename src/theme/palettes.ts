import type { ColorScheme } from './scheme';
import { SHEET, THEMES, type ThemeTokens } from './themes';

export const PALETTES = ['emerald', 'ocean', 'amber', 'plum', 'graphite'] as const;
export type Palette = (typeof PALETTES)[number];

export const PALETTE_LABELS: Record<Palette, string> = {
  emerald: 'Émeraude',
  ocean: 'Océan',
  amber: 'Ambre',
  plum: 'Prune',
  graphite: 'Graphite',
};

export function isPalette(value: unknown): value is Palette {
  return PALETTES.includes(value as Palette);
}

type Variant = { screen: Partial<ThemeTokens>; sheet: Partial<ThemeTokens> };
type PaletteDef = { card?: string; dark: Variant; light: Variant };

const NONE: Variant = { screen: {}, sheet: {} };

// Palettes tint surfaces only slightly. Category colors never change.
const PALETTE_DEFS: Record<Palette, PaletteDef> = {
  emerald: { dark: NONE, light: NONE },
  ocean: {
    card: '#151A20',
    dark: {
      screen: {
        bg: '#0A0C0F',
        card: '#14171B',
        tile: '#1C2026',
        raised: '#272C33',
        line: '#23272D',
        outline: '#363C45',
        accent: '#5AA9E6',
        onAccent: '#0B0B0B',
        positive: '#5AA9E6',
      },
      sheet: {
        bg: '#1F242A',
        card: '#272C33',
        tile: '#2D333A',
        raised: '#3A4048',
        line: '#2D333A',
      },
    },
    light: {
      screen: {
        bg: '#F3F5F7',
        tile: '#E9EDF1',
        raised: '#DDE2E8',
        line: '#E1E5EA',
        outline: '#CDD3DA',
        accent: '#1F6FB2',
        onAccent: '#FFFFFF',
        positive: '#1F6FB2',
      },
      sheet: { card: '#F1F4F7', tile: '#E9EDF1', raised: '#DDE2E8', line: '#E8ECF0' },
    },
  },
  amber: {
    card: '#1B1814',
    dark: {
      screen: {
        bg: '#0D0B09',
        card: '#181512',
        tile: '#211D19',
        raised: '#2C2722',
        line: '#28231F',
        outline: '#3D3630',
        accent: '#E8A23A',
        onAccent: '#0B0B0B',
        positive: '#E8A23A',
      },
      sheet: {
        bg: '#231F1B',
        card: '#2C2722',
        tile: '#322C27',
        raised: '#3F3832',
        line: '#322C27',
      },
    },
    light: {
      screen: {
        bg: '#F7F4EE',
        tile: '#EFEAE1',
        raised: '#E5DED2',
        line: '#E8E2D8',
        outline: '#D6CDBF',
        accent: '#9A5B0B',
        onAccent: '#FFFFFF',
        positive: '#9A5B0B',
      },
      sheet: { card: '#F6F1E9', tile: '#EFEAE1', raised: '#E5DED2', line: '#EDE7DD' },
    },
  },
  plum: {
    card: '#19171D',
    dark: {
      screen: {
        bg: '#0C0B0E',
        card: '#17151A',
        tile: '#1F1D24',
        raised: '#2A272F',
        line: '#26242B',
        outline: '#3A3742',
        accent: '#B49CF0',
        onAccent: '#0B0B0B',
        positive: '#B49CF0',
      },
      sheet: {
        bg: '#221F27',
        card: '#2A272F',
        tile: '#302D36',
        raised: '#3D3A44',
        line: '#302D36',
      },
    },
    light: {
      screen: {
        bg: '#F5F4F7',
        tile: '#ECEAF1',
        raised: '#E1DEE8',
        line: '#E5E2EB',
        outline: '#D1CDDA',
        accent: '#6B4FB8',
        onAccent: '#FFFFFF',
        positive: '#6B4FB8',
      },
      sheet: { card: '#F3F1F6', tile: '#ECEAF1', raised: '#E1DEE8', line: '#EAE7EF' },
    },
  },
  // Monochrome accent; income stays green so it reads at a glance.
  graphite: {
    dark: { screen: { accent: '#EDEDED', onAccent: '#0B0B0B' }, sheet: {} },
    light: { screen: { accent: '#141413', onAccent: '#F6F5F1' }, sheet: {} },
  },
};

type Resolved = { screen: ThemeTokens; sheet: ThemeTokens };

function resolve(palette: Palette, scheme: ColorScheme): Resolved {
  const def = PALETTE_DEFS[palette];
  const screen = {
    ...THEMES[scheme],
    ...(def.card ? { dark: def.card } : {}),
    ...def[scheme].screen,
  };
  return { screen, sheet: { ...screen, ...SHEET[scheme], ...def[scheme].sheet } };
}

// Resolved once so hooks return stable objects.
const TABLE = Object.fromEntries(
  PALETTES.map((p) => [p, { dark: resolve(p, 'dark'), light: resolve(p, 'light') }]),
) as Record<Palette, Record<ColorScheme, Resolved>>;

export function getThemeTokens(palette: Palette, scheme: ColorScheme): ThemeTokens {
  return TABLE[palette][scheme].screen;
}

export function getSheetTokens(palette: Palette, scheme: ColorScheme): ThemeTokens {
  return TABLE[palette][scheme].sheet;
}
