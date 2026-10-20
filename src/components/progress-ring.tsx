import { useEffect, type ReactNode } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { useThemeTokens } from '@/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const R = 30;
const LENGTH = 2 * Math.PI * R;
const TICKS = Array.from({ length: 40 }, (_, k) => {
  const a = (2 * Math.PI * k) / 40;
  const p = (r: number) =>
    `${(38 + r * Math.cos(a)).toFixed(1)} ${(38 + r * Math.sin(a)).toFixed(1)}`;
  return `M${p(35)}L${p(37.5)}`;
});

type Props = { value: number; color: string; size?: number; children?: ReactNode };

export function ProgressRing({ value, color, size = 76, children }: Props) {
  const t = useThemeTokens();
  const reduced = useReducedMotion();
  const pct = Math.max(0, Math.min(100, value));
  const progress = useSharedValue(reduced ? pct : 0);

  useEffect(() => {
    progress.set(
      reduced ? pct : withTiming(pct, { duration: 700, easing: Easing.out(Easing.cubic) }),
    );
  }, [pct, progress, reduced]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: LENGTH * (1 - progress.get() / 100),
  }));

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg
        width={size}
        height={size}
        viewBox="0 0 76 76"
        style={{ position: 'absolute' }}
        pointerEvents="none"
      >
        <G stroke={t.outline} strokeWidth={1.2} strokeLinecap="round">
          {TICKS.map((d) => (
            <Path key={d} d={d} />
          ))}
        </G>
        <Circle cx={38} cy={38} r={R} stroke={t.line} strokeWidth={5} fill="none" />
        <AnimatedCircle
          cx={38}
          cy={38}
          r={R}
          stroke={color}
          strokeOpacity={pct > 0 ? 1 : 0}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={`${LENGTH} ${LENGTH}`}
          animatedProps={animatedProps}
          transform="rotate(-90 38 38)"
          fill="none"
        />
      </Svg>
      {children}
    </View>
  );
}
