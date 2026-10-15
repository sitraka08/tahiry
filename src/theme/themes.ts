export const THEME_NAMES = ['Menthe', 'Soleil', 'Ciel', 'Pêche'] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export type ThemeTokens = {
  bg: string;
  card: string;
  tile: string;
  ink: string;
  muted: string;
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
};

const BASE: Omit<ThemeTokens, 'accent'> = {
  bg: '#101010',
  card: '#1C1C1C',
  tile: '#2E2E2E',
  ink: '#FFFFFF',
  muted: '#9A9A9A',
  onAccent: '#101010',
  dark: '#242424',
  onDark: '#FFFFFF',
  darkMuted: '#9A9A9A',
  inverse: '#FFFFFF',
  onInverse: '#101010',
  positive: '#74F07A',
  negative: '#FF9F5A',
  line: '#262626',
  outline: '#3A3A3A',
  seg3: '#6B6B6B',
  danger: '#FF6B5E',
};

export const THEMES: Record<ThemeName, ThemeTokens> = {
  Menthe: { ...BASE, accent: '#74F07A' },
  Soleil: { ...BASE, accent: '#FAF354' },
  Ciel: { ...BASE, accent: '#7CC8F8' },
  Pêche: { ...BASE, accent: '#FFB07A' },
};
