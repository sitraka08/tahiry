import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import { shade } from '@/lib/color';
import { useCardTokens, useThemeTokens } from '@/theme';

export function WalletIllustration() {
  const t = useThemeTokens();
  const P = useCardTokens();
  return (
    <Svg width={96} height={72} viewBox="0 0 120 90">
      <Ellipse cx={60} cy={85} rx={46} ry={3.5} fill={t.shadow} />
      <G
        stroke={t.illusInk}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <G transform="rotate(-10 64 30)">
          <Rect x={34} y={8} width={62} height={40} rx={5} fill={P.catBlue} />
          <Rect x={42} y={18} width={11} height={8} rx={2} fill={P.catSand} />
          <Path d="M42 36h22" strokeOpacity={0.7} />
        </G>
        <Rect x={12} y={32} width={94} height={50} rx={8} fill={P.catOrange} />
        <Rect
          x={18}
          y={38}
          width={82}
          height={38}
          rx={5}
          strokeDasharray="2 4"
          strokeOpacity={0.45}
        />
        <Rect x={84} y={49} width={26} height={17} rx={5} fill={shade(P.catOrange, 0.2)} />
        <Circle cx={93} cy={57.5} r={2.4} fill={t.illusInk} stroke="none" />
      </G>
    </Svg>
  );
}
