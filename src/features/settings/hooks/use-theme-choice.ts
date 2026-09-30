import { setSetting } from '@/db';
import { useThemeStore, type ThemeName } from '@/theme';

export function chooseTheme(name: ThemeName) {
  useThemeStore.getState().setTheme(name);
  setSetting('theme', name);
}
