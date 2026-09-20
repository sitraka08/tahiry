export const THEME_NAMES = ['Citron', 'Nuit', 'Ciel', 'Pêche'] as const;
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
  line: string;
  seg3: string;
  danger: string;
};

export const THEMES: Record<ThemeName, ThemeTokens> = {
  Citron: {
    bg: '#FCFDF0',
    card: '#EFF1DD',
    tile: '#FFFFFF',
    ink: '#121212',
    muted: '#55584A',
    accent: '#D4F542',
    onAccent: '#121212',
    dark: '#121212',
    onDark: '#FCFDF0',
    darkMuted: '#C9CBB8',
    line: '#E3E5D2',
    seg3: '#7A7D6A',
    danger: '#B3261E',
  },
  Nuit: {
    bg: '#121212',
    card: '#1F201B',
    tile: '#2E3029',
    ink: '#F4F5E6',
    muted: '#A9AC98',
    accent: '#D4F542',
    onAccent: '#121212',
    dark: '#262720',
    onDark: '#F4F5E6',
    darkMuted: '#A9AC98',
    line: '#2A2B24',
    seg3: '#6E7160',
    danger: '#F2B8B5',
  },
  Ciel: {
    bg: '#F3F8FC',
    card: '#E3EDF5',
    tile: '#FFFFFF',
    ink: '#0F1A24',
    muted: '#4A5866',
    accent: '#8FD0F5',
    onAccent: '#0F1A24',
    dark: '#0F1A24',
    onDark: '#F3F8FC',
    darkMuted: '#B8C6D2',
    line: '#D8E3EC',
    seg3: '#5C6D7C',
    danger: '#B3261E',
  },
  Pêche: {
    bg: '#FFF6EF',
    card: '#F8E6D8',
    tile: '#FFFFFF',
    ink: '#1E1410',
    muted: '#6A5246',
    accent: '#FFB07A',
    onAccent: '#1E1410',
    dark: '#1E1410',
    onDark: '#FFF6EF',
    darkMuted: '#D9C2B4',
    line: '#EFDCCD',
    seg3: '#8A6E60',
    danger: '#B3261E',
  },
};
