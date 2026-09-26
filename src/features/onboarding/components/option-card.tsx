import { Check } from 'lucide-react-native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { PressableFeedback } from '@/components';
import { useThemeTokens } from '@/theme';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  variant: 'type' | 'goal';
};

export function OptionCard({ label, selected, onPress, variant }: Props) {
  const t = useThemeTokens();
  const progress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    progress.set(withTiming(selected ? 1 : 0, { duration: 160 }));
  }, [progress, selected]);

  const fill = useAnimatedStyle(() => ({ opacity: progress.get() }));
  const isType = variant === 'type';

  return (
    <PressableFeedback
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={onPress}
      className={`flex-row items-center overflow-hidden rounded-2xl bg-card ${
        isType ? 'h-[60px] flex-1 gap-2.5 px-3' : 'min-h-14 gap-3 px-3.5 py-2'
      }`}
    >
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: t.dark }, fill]}
      />
      <View
        className={`size-[22px] items-center justify-center rounded-[7px] ${selected ? 'bg-accent' : 'border-[1.5px] border-seg3'}`}
      >
        {selected ? <Check size={14} color={t.onAccent} strokeWidth={3} /> : null}
      </View>
      <Text
        className={`flex-1 ${selected ? 'font-gs-bold text-on-dark' : 'font-gs-medium text-ink'} ${
          isType ? 'text-sm' : 'text-[15px]'
        }`}
      >
        {label}
      </Text>
    </PressableFeedback>
  );
}
