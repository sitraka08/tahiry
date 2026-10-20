import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import { shade } from '@/lib/color';
import { THEMES, useThemeTokens } from '@/theme';

// Fills stay pastel in both schemes; outlines and shadows follow the scheme.
const P = THEMES.dark;

type Props = { type: 'bank' | 'mobile' | 'cash' | 'group' };

export function AccountIllustration({ type }: Props) {
  const t = useThemeTokens();
  return (
    <Svg width={60} height={44} viewBox="0 0 60 44">
      <Ellipse cx={30} cy={41} rx={22} ry={2.5} fill={t.shadow} />
      <G
        stroke={t.illusInk}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {type === 'mobile' ? (
          <G transform="rotate(-8 30 22)">
            <Rect x={19} y={3} width={24} height={38} rx={5} fill={P.catSand} />
            <Rect x={22} y={8} width={18} height={27} rx={2} fill={P.bg} strokeOpacity={0.4} />
            <Path d="M24 28c3-2 5 1 8-1s4-5 6-4" stroke={P.catSand} strokeWidth={1.6} />
            <Path d="M25 13h10" strokeOpacity={0.7} />
          </G>
        ) : null}
        {type === 'bank' ? (
          <>
            <G transform="rotate(-8 30 22)">
              <Rect x={12} y={6} width={38} height={25} rx={4} fill={shade(P.catBlue, 0.25)} />
            </G>
            <Rect x={8} y={12} width={40} height={26} rx={4} fill={P.catBlue} />
            <Rect x={13} y={19} width={8} height={6} rx={1.5} fill={P.catSand} />
            <Path d="M13 32h14M31 32h6" strokeOpacity={0.8} />
          </>
        ) : null}
        {type === 'cash' ? (
          <>
            <G transform="rotate(-10 30 22)">
              <Rect x={8} y={8} width={42} height={24} rx={3} fill={shade(P.catOrange, 0.2)} />
            </G>
            <Rect x={10} y={13} width={42} height={24} rx={3} fill={P.catOrange} />
            <Rect x={14} y={17} width={34} height={16} rx={2} strokeOpacity={0.5} />
            <Circle cx={31} cy={25} r={4.5} fill={shade(P.catOrange, 0.1)} />
          </>
        ) : null}
        {type === 'group' ? (
          <>
            <Circle cx={23} cy={24} r={11} fill={shade(P.catViolet, 0.2)} />
            <Circle cx={36} cy={22} r={12} fill={P.catViolet} />
            <Path d="M32 22h8M36 18v8" strokeOpacity={0.7} />
          </>
        ) : null}
      </G>
    </Svg>
  );
}
