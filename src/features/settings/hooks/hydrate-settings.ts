import { getSetting } from '@/db';
import { useUiStore } from '@/lib/ui-store';
import { isColorSchemePref, isPalette, useThemeStore } from '@/theme';

export function hydrateSettings() {
  const colorScheme = getSetting('colorScheme');
  if (isColorSchemePref(colorScheme)) useThemeStore.getState().setColorScheme(colorScheme);
  const palette = getSetting('palette');
  if (isPalette(palette)) useThemeStore.getState().setPalette(palette);
  useUiStore.setState({ hideAmounts: getSetting('hideAmounts') === '1' });
}
