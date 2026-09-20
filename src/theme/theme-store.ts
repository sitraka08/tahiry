import { create } from 'zustand';

import type { ThemeName } from './themes';

type ThemeState = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'Citron',
  setTheme: (theme) => set({ theme }),
}));
