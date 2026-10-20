import { create } from 'zustand';

import type { ColorSchemePref } from './scheme';

type ThemeState = {
  colorScheme: ColorSchemePref;
  setColorScheme: (colorScheme: ColorSchemePref) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  colorScheme: 'dark',
  setColorScheme: (colorScheme) => set({ colorScheme }),
}));
