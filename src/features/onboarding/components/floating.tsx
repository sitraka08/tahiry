import { useEffect, type ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import Animated, {
  Easing,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children: ReactNode;
  style: ViewStyle;
  rotate?: number;
  delay?: number;
  amplitude?: number;
  duration?: number;
  axis?: 'x' | 'y';
};

export function Floating({
  children,
  style,
  rotate = 0,
  delay = 0,
  amplitude = 6,
  duration = 2200,
  axis = 'y',
}: Props) {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.set(
      withDelay(
        delay + 600,
        withRepeat(withTiming(amplitude, { duration, easing: Easing.inOut(Easing.sin) }), -1, true),
      ),
    );
  }, [offset, delay, amplitude, duration]);

  const float = useAnimatedStyle(() => ({
    transform: axis === 'y' ? [{ translateY: offset.get() }] : [{ translateX: offset.get() }],
  }));

  return (
    <Animated.View
      entering={ZoomIn.delay(delay).springify().damping(14)}
      style={[{ position: 'absolute' }, style]}
    >
      <Animated.View style={{ transform: [{ rotate: `${rotate}deg` }] }}>
        <Animated.View style={float}>{children}</Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
