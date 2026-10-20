import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import { shade } from '@/lib/color';
import { THEMES, useThemeTokens } from '@/theme';

const P = THEMES.dark;
const ZIGZAG = Array.from({ length: 10 }, (_, i) => `l-7 ${i % 2 === 0 ? 5 : -5}`).join('');

function Coins({ cx, bottom, count }: { cx: number; bottom: number; count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, k) => {
        const b = bottom - 9 * k;
        return (
          <G key={k}>
            <Path d={`M${cx - 22} ${b - 9}v9a22 6 0 0 0 44 0v-9`} fill={shade(P.catOrange, 0.2)} />
            <Ellipse cx={cx} cy={b - 9} rx={22} ry={6} fill={P.catOrange} />
          </G>
        );
      })}
      <Ellipse cx={cx} cy={bottom - 9 * count} rx={13} ry={3.2} strokeOpacity={0.45} />
    </>
  );
}

export function WelcomeIllustration() {
  const t = useThemeTokens();
  return (
    <Svg width={320} height={230} viewBox="0 0 320 230">
      <Ellipse cx={200} cy={208} rx={46} ry={5} fill={t.shadow} />
      <Ellipse cx={62} cy={208} rx={40} ry={4} fill={t.shadow} />
      <Ellipse cx={270} cy={203} rx={30} ry={5} fill={t.shadow} />
      <G
        stroke={t.illusInk}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <Path d="M24 206H296" strokeOpacity={0.25} />
        <G transform="rotate(-8 125 125)">
          <Rect x={40} y={70} width={150} height={82} rx={6} fill={shade(P.catSand, 0.2)} />
          <Rect x={52} y={84} width={150} height={82} rx={6} fill={P.catSand} />
          <Rect x={60} y={92} width={134} height={66} rx={3} strokeOpacity={0.55} />
          <Circle cx={127} cy={125} r={17} fill={shade(P.catSand, 0.1)} />
          <Path d="M121 125h12M127 119v12" strokeOpacity={0.8} />
          <Path d="M70 104h26M158 146h26" strokeOpacity={0.7} />
        </G>
        <G transform="rotate(6 198 120)">
          <Rect x={150} y={30} width={96} height={172} rx={14} fill={P.tile} />
          <Rect x={158} y={46} width={80} height={140} rx={6} fill={P.bg} strokeOpacity={0.35} />
          <Path d="M186 38h24" strokeOpacity={0.5} />
          <Path d="M167 60h36" strokeWidth={3} />
          <Path d="M167 70h22" strokeOpacity={0.45} />
          <Path d="M164 110h70M164 122h52" strokeOpacity={0.25} />
          <Path
            d="M164 172c10-5 18 3 28-5s16-18 26-12 12 0 16-6"
            stroke={P.accent}
            strokeWidth={2}
          />
        </G>
        <G transform="rotate(-5 60 160)">
          <Path d={`M26 118H96V198${ZIGZAG}Z`} fill={P.ink} fillOpacity={0.9} />
          <Path d="M36 132h40M36 144h28M36 156h46" stroke={P.subtle} />
          <Path d="M36 176h18M66 176h20" stroke={P.bg} strokeWidth={2.2} />
        </G>
        <Coins cx={270} bottom={200} count={5} />
      </G>
    </Svg>
  );
}
