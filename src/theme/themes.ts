import type { ColorScheme } from './scheme';

export type ThemeTokens = {
  bg: string;
  card: string;
  tile: string;
  raised: string;
  ink: string;
  muted: string;
  subtle: string;
  accent: string;
  onAccent: string;
  dark: string;
  onDark: string;
  darkMuted: string;
  inverse: string;
  onInverse: string;
  positive: string;
  negative: string;
  line: string;
  outline: string;
  seg3: string;
  danger: string;
  catOrange: string;
  catBlue: string;
  catSand: string;
  catViolet: string;
  catRose: string;
  catTeal: string;
  catGreen: string;
  illusInk: string;
  shadow: string;
};

// The balance card keeps the same dark look in both schemes.
const CARD = { dark: '#171A18', onDark: '#FFFFFF', darkMuted: '#A7A7A7' };

export const THEMES: Record<ColorScheme, ThemeTokens> = {
  dark: {
    ...CARD,
    bg: '#0B0B0B',
    card: '#161616',
    tile: '#1F1F1F',
    raised: '#2A2A2A',
    ink: '#FFFFFF',
    muted: '#A7A7A7',
    subtle: '#6E6E6E',
    accent: '#1ED760',
    onAccent: '#0B0B0B',
    inverse: '#FFFFFF',
    onInverse: '#0B0B0B',
    positive: '#1ED760',
    negative: '#FFFFFF',
    line: '#262626',
    outline: '#3A3A3A',
    seg3: '#6B6B6B',
    danger: '#FF6B5E',
    catOrange: '#D9906E',
    catBlue: '#82A9D4',
    catSand: '#D4B872',
    catViolet: '#A59BD6',
    catRose: '#D18FA3',
    catTeal: '#76BDB2',
    catGreen: '#1ED760',
    illusInk: '#E9E6DF',
    shadow: 'rgba(0,0,0,0.55)',
  },
  light: {
    ...CARD,
    bg: '#F6F5F1',
    card: '#FFFFFF',
    tile: '#EEECE6',
    raised: '#E4E1DA',
    ink: '#141413',
    muted: '#6B6862',
    subtle: '#9A968D',
    accent: '#11833A',
    onAccent: '#FFFFFF',
    inverse: '#141413',
    onInverse: '#F6F5F1',
    positive: '#11833A',
    negative: '#141413',
    line: '#E6E3DC',
    outline: '#D3CFC6',
    seg3: '#9A968D',
    danger: '#C2412D',
    catOrange: '#B3633F',
    catBlue: '#3F6E9E',
    catSand: '#8C6F24',
    catViolet: '#6B5FB0',
    catRose: '#A85470',
    catTeal: '#2F8579',
    catGreen: '#11833A',
    illusInk: '#2B2925',
    shadow: 'rgba(20,20,19,0.25)',
  },
};

// Sheets sit one step lighter than the screen, like Spotify, so the
// surfaces inside them move up one step as well.
export const SHEET: Record<ColorScheme, Partial<ThemeTokens>> = {
  dark: { bg: '#282828', card: '#333333', tile: '#3A3A3A', raised: '#474747', line: '#3A3A3A' },
  light: { bg: '#FFFFFF', card: '#F4F2EC', tile: '#EEECE6', raised: '#E4E1DA', line: '#ECE9E2' },
};
