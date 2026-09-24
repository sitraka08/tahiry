import { cssInterop } from 'nativewind';
import type { ReactNode } from 'react';
import { Pressable, type GestureResponderEvent, type PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
cssInterop(AnimatedPressable, { className: 'style' });

type Props = Omit<PressableProps, 'style' | 'children'> & {
  className?: string;
  scaleTo?: number;
  children?: ReactNode;
};

const TIMING = { duration: 90 };

export function PressableScale({ scaleTo = 0.98, onPressIn, onPressOut, ...rest }: Props) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));

  const handleIn = (e: GestureResponderEvent) => {
    scale.set(withTiming(scaleTo, TIMING));
    onPressIn?.(e);
  };
  const handleOut = (e: GestureResponderEvent) => {
    scale.set(withTiming(1, TIMING));
    onPressOut?.(e);
  };

  return <AnimatedPressable {...rest} style={style} onPressIn={handleIn} onPressOut={handleOut} />;
}
