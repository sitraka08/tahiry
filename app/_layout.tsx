import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getSetting, migrate } from '@/db';
import { THEME_NAMES, ThemeProvider, useThemeStore, type ThemeName } from '@/theme';

function boot() {
  migrate();
  const saved = getSetting('theme');
  if (saved && THEME_NAMES.includes(saved as ThemeName)) {
    useThemeStore.getState().setTheme(saved as ThemeName);
  }
  return true;
}

export default function RootLayout() {
  const [ready] = useState(boot);
  if (!ready) return null;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <ThemeProvider>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
