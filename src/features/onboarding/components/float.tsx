import { useEffect, type ReactNode } from 'react';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  style: ViewStyle;
  delay?: number;
  float?: number;
  axis?: 'x' | 'y';
};

export function Float({ children, style, delay = 0, float = 0, axis = 'y' }: Props) {
  const offset = useSharedValue(0);

  useEffect(() => {
    if (!float) return;
    offset.set(
      withDelay(
        delay + 500,
        withRepeat(
          withTiming(float, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
          -1,
          true,
        ),
      ),
    );
  }, [offset, delay, float]);

  const move = useAnimatedStyle(() => ({
    transform: axis === 'y' ? [{ translateY: offset.get() }] : [{ translateX: offset.get() }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(380)}
      style={[{ position: 'absolute' }, style]}
    >
      <Animated.View style={move}>{children}</Animated.View>
    </Animated.View>
  );
}
