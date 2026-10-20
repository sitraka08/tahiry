import Svg, { Path } from 'react-native-svg';

const W = 360;
const H = 240;
const LINES = Array.from({ length: 16 }, (_, i) => {
  const y = H + 10 - i * 18;
  return `M-10 ${y} C70 ${y - 32} 130 ${y + 20} 200 ${y - 18} S310 ${y - 58} 370 ${y - 30}`;
});

type Props = { color: string; opacity?: number };

// Faint contour lines that give a card some texture.
export function TopoPattern({ color, opacity = 0.05 }: Props) {
  return (
    <Svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      pointerEvents="none"
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    >
      {LINES.map((d) => (
        <Path key={d} d={d} stroke={color} strokeOpacity={opacity} strokeWidth={1} fill="none" />
      ))}
    </Svg>
  );
}
