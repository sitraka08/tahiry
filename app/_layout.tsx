import '../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getSetting, migrate } from '@/db';
import { FONTS, THEME_NAMES, ThemeProvider, useThemeStore, type ThemeName } from '@/theme';

SplashScreen.preventAutoHideAsync();

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
  const [fontsLoaded, fontError] = useFonts(FONTS);
  const loaded = ready && (fontsLoaded || !!fontError);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

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
