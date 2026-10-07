import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { PIN_LENGTH } from '../hooks/pin-logic';
import { useThemeTokens } from '@/theme';

type Props = { filled: number; tone: 'light' | 'dark'; shake?: number };

export function PinDots({ filled, tone, shake = 0 }: Props) {
  const t = useThemeTokens();
  const offset = useSharedValue(0);

  useEffect(() => {
    if (shake === 0) return;
    offset.set(
      withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 80 }),
        withTiming(-8, { duration: 80 }),
        withTiming(0, { duration: 50 }),
      ),
    );
  }, [offset, shake]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: offset.get() }] }));
  const on = tone === 'dark' ? t.accent : t.dark;
  const off = tone === 'dark' ? t.onDark : t.line;

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel={`${filled} chiffres sur ${PIN_LENGTH}`}
      style={[{ flexDirection: 'row', gap: 16 }, style]}
    >
      {Array.from({ length: PIN_LENGTH }, (_, i) => (
        <View
          key={i}
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: i < filled ? on : off,
            opacity: i < filled ? 1 : tone === 'dark' ? 0.25 : 1,
          }}
        />
      ))}
    </Animated.View>
  );
}
