import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useThemeTokens } from '@/theme';

type Props = { step: number; total?: number };

function Segment({ index, step }: { index: number; step: number }) {
  const t = useThemeTokens();
  const fill = useSharedValue(index < step - 1 ? 1 : 0);

  useEffect(() => {
    fill.set(withTiming(index < step ? 1 : 0, { duration: 350 }));
  }, [fill, index, step]);

  const style = useAnimatedStyle(() => ({ width: `${fill.get() * 100}%` }));

  return (
    <View className="h-1.5 flex-1 overflow-hidden rounded-[3px] bg-line">
      <Animated.View
        style={[{ height: '100%', borderRadius: 3, backgroundColor: t.dark }, style]}
      />
    </View>
  );
}

export function ProgressSegments({ step, total = 3 }: Props) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={`Étape ${step} sur ${total}`}
      className="flex-1 flex-row gap-1.5"
    >
      {Array.from({ length: total }, (_, i) => (
        <Segment key={i} index={i} step={step} />
      ))}
    </View>
  );
}
