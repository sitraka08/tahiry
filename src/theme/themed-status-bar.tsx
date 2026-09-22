import { StatusBar } from 'expo-status-bar';

import { useThemeTokens } from './theme-provider';

export function ThemedStatusBar() {
  const { mode } = useThemeTokens();
  return <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />;
}
