import { Check } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToastStore } from '@/lib/toast-store';
import { useThemeTokens } from '@/theme';

import { AppText } from './app-text';

const DURATION = 2200;

export function ToastHost() {
  const t = useThemeTokens();
  const insets = useSafeAreaInsets();
  const message = useToastStore((s) => s.message);
  const id = useToastStore((s) => s.id);
  const hide = useToastStore((s) => s.hide);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(hide, DURATION);
    return () => clearTimeout(timer);
  }, [message, id, hide]);

  if (!message) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: Math.max(insets.bottom, 16) + 96,
        alignItems: 'center',
        zIndex: 40,
      }}
    >
      <Animated.View
        key={id}
        entering={FadeInDown.duration(220)}
        exiting={FadeOutDown.duration(180)}
      >
        <View
          accessibilityRole="alert"
          className="flex-row items-center gap-2 rounded-full bg-inverse px-4 py-3"
        >
          <View className="size-5 items-center justify-center rounded-full bg-accent">
            <Check size={12} color={t.onAccent} strokeWidth={3} />
          </View>
          <AppText weight="medium" className="text-sm text-on-inverse">
            {message}
          </AppText>
        </View>
      </Animated.View>
    </View>
  );
}
