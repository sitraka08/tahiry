import { StatusBar } from 'expo-status-bar';

import { useResolvedColorScheme } from './theme-provider';

export function ThemedStatusBar() {
  const scheme = useResolvedColorScheme();
  return <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />;
}
