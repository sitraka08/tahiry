import '../global.css';

import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, type ReactNode } from 'react';
import { Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getSetting, migrate } from '@/db';
import { LockGate, resetAllData, useLockStore } from '@/features/security';
import { hydrateSettings, useUserName } from '@/features/settings';
import { setupNotifications } from '@/lib/notifications';
import { ToastHost } from '@/components';
import { FONTS, ThemeProvider, ThemedStatusBar } from '@/theme';

SplashScreen.preventAutoHideAsync();

function boot() {
  migrate();
  setupNotifications();
  hydrateSettings();
  if (getSetting('pinEnabled') === '1') useLockStore.getState().lock();
  return true;
}

function AppLock({ children }: { children: ReactNode }) {
  const router = useRouter();
  const name = useUserName();

  const forgot = () =>
    Alert.alert(
      'Code oublié ?',
      'Pour retrouver l’accès, il faut effacer toutes les données de l’app sur ce téléphone.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Tout effacer',
          style: 'destructive',
          onPress: async () => {
            await resetAllData();
            useLockStore.getState().unlock();
            router.replace('/');
          },
        },
      ],
    );

  return (
    <LockGate name={name} onForgot={forgot}>
      {children}
    </LockGate>
  );
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
            <AppLock>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              >
                <Stack.Screen name="index" options={{ animation: 'fade' }} />
                <Stack.Screen name="add-transaction" options={{ animation: 'slide_from_bottom' }} />
              </Stack>
              <ToastHost />
            </AppLock>
          </ThemeProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
