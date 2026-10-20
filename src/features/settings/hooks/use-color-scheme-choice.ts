import { setSetting } from '@/db';
import { useThemeStore, type ColorSchemePref } from '@/theme';

export function chooseColorScheme(value: ColorSchemePref) {
  useThemeStore.getState().setColorScheme(value);
  setSetting('colorScheme', value);
}

export function useColorSchemeChoice() {
  return useThemeStore((s) => s.colorScheme);
}
