import { getSetting } from '@/db';
import { useUiStore } from '@/lib/ui-store';
import { isColorSchemePref, useThemeStore } from '@/theme';

export function hydrateSettings() {
  const colorScheme = getSetting('colorScheme');
  if (isColorSchemePref(colorScheme)) useThemeStore.getState().setColorScheme(colorScheme);
  useUiStore.setState({ hideAmounts: getSetting('hideAmounts') === '1' });
}
