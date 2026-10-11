import { getSetting } from '@/db';
import { useUiStore } from '@/lib/ui-store';
import { THEME_NAMES, useThemeStore, type ThemeName } from '@/theme';

export function hydrateSettings() {
  const theme = getSetting('theme');
  if (theme && THEME_NAMES.includes(theme as ThemeName)) {
    useThemeStore.getState().setTheme(theme as ThemeName);
  }
  useUiStore.setState({ hideAmounts: getSetting('hideAmounts') === '1' });
}
