import { Check } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  ZoomIn,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { PressableScale } from '@/components';
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
    progress.set(withTiming(selected ? 1 : 0, { duration: 220 }));
  }, [progress, selected]);

  const box = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.get(), [0, 1], [t.card, t.dark]),
  }));
  const text = useAnimatedStyle(() => ({
    color: interpolateColor(progress.get(), [0, 1], [t.ink, t.onDark]),
  }));

  const isType = variant === 'type';

  return (
    <PressableScale
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={onPress}
      className={isType ? 'flex-1' : ''}
    >
      <Animated.View
        style={box}
        className={`flex-row items-center rounded-2xl ${isType ? 'h-[60px] gap-2.5 px-3' : 'min-h-14 gap-3 px-3.5 py-2'}`}
      >
        <View
          className={`size-[22px] items-center justify-center rounded-[7px] ${selected ? 'bg-accent' : 'border-[1.5px] border-seg3'}`}
        >
          {selected ? (
            <Animated.View entering={ZoomIn.duration(180)}>
              <Check size={14} color={t.onAccent} strokeWidth={3} />
            </Animated.View>
          ) : null}
        </View>
        <Animated.Text
          style={text}
          className={`flex-1 ${selected ? 'font-gs-bold' : 'font-gs-medium'} ${isType ? 'text-sm' : 'text-[15px]'}`}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </PressableScale>
  );
}
