import '../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getSetting, migrate } from '@/db';
import { setupNotifications } from '@/lib/notifications';
import {
  FONTS,
  THEME_NAMES,
  ThemeProvider,
  ThemedStatusBar,
  useThemeStore,
  type ThemeName,
} from '@/theme';

SplashScreen.preventAutoHideAsync();

function boot() {
  migrate();
  setupNotifications();
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
        <KeyboardProvider>
          <ThemeProvider>
            <ThemedStatusBar />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
              }}
            />
          </ThemeProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
