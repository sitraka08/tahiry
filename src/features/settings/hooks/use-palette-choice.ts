import { setSetting } from '@/db';
import { useThemeStore, type Palette } from '@/theme';

export function choosePalette(value: Palette) {
  useThemeStore.getState().setPalette(value);
  setSetting('palette', value);
}

export function usePaletteChoice() {
  return useThemeStore((s) => s.palette);
}
