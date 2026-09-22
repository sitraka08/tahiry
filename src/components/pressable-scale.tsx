import { cssInterop } from 'nativewind';
import type { ReactNode } from 'react';
import { Pressable, type GestureResponderEvent, type PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
cssInterop(AnimatedPressable, { className: 'style' });

type Props = Omit<PressableProps, 'style' | 'children'> & {
  className?: string;
  scaleTo?: number;
  children?: ReactNode;
};

const SPRING = { damping: 16, stiffness: 320, mass: 0.6 };

export function PressableScale({ scaleTo = 0.97, onPressIn, onPressOut, ...rest }: Props) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));

  const handleIn = (e: GestureResponderEvent) => {
    scale.set(withSpring(scaleTo, SPRING));
    onPressIn?.(e);
  };
  const handleOut = (e: GestureResponderEvent) => {
    scale.set(withSpring(1, SPRING));
    onPressOut?.(e);
  };

  return <AnimatedPressable {...rest} style={style} onPressIn={handleIn} onPressOut={handleOut} />;
}
