import { create } from 'zustand';

import type { Palette } from './palettes';
import type { ColorSchemePref } from './scheme';

type ThemeState = {
  colorScheme: ColorSchemePref;
  palette: Palette;
  setColorScheme: (colorScheme: ColorSchemePref) => void;
  setPalette: (palette: Palette) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  colorScheme: 'dark',
  palette: 'emerald',
  setColorScheme: (colorScheme) => set({ colorScheme }),
  setPalette: (palette) => set({ palette }),
}));
