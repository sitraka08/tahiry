import { useState } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, Line, Polygon, Polyline, Text as SvgText } from 'react-native-svg';

import { AppText } from '@/components';
import { formatCompact } from '@/lib/money';
import { useUiStore } from '@/lib/ui-store';
import { useThemeTokens } from '@/theme';

import { PERIOD_SUFFIX, toChartPoints } from '../hooks/stats-math';
import type { Period } from '../types';

const HEIGHT = 140;

type Props = { period: Period; labels: string[]; values: number[]; change: number | null };

export function BalanceChart({ period, labels, values, change }: Props) {
  const t = useThemeTokens();
  const hide = useUiStore((s) => s.hideAmounts);
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  const points = toChartPoints(values, width, HEIGHT);
  const line = points.map((p) => `${p.x},${p.y}`).join(' ');
  const last = points[points.length - 1];
  const first = points[0];

  return (
    <View className="mx-5 mt-3.5 rounded-[22px] bg-dark p-4">
      <View className="flex-row items-baseline justify-between gap-2">
        <AppText weight="bold" className="text-[15px] text-on-dark">
          Évolution du solde
        </AppText>
        {change !== null ? (
          <AppText
            weight="bold"
            className="overflow-hidden rounded-full bg-accent px-2 py-[3px] text-xs text-on-accent"
          >
            {change > 0 ? '+' : change < 0 ? '−' : ''}
            {Math.abs(change)} % {PERIOD_SUFFIX[period]}
          </AppText>
        ) : null}
      </View>

      <View className="mt-3" onLayout={onLayout}>
        {width > 0 && last && first ? (
          <Svg width={width} height={HEIGHT}>
            {[10, 50, 90, 130].map((y) => (
              <Line
                key={y}
                x1={0}
                x2={width}
                y1={y}
                y2={y}
                stroke={t.darkMuted}
                strokeOpacity={0.25}
                strokeDasharray="3 5"
              />
            ))}
            <Polygon
              points={`${line} ${last.x},${HEIGHT} ${first.x},${HEIGHT}`}
              fill={t.accent}
              fillOpacity={0.18}
            />
            <Polyline
              points={line}
              fill="none"
              stroke={t.accent}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle
              cx={last.x}
              cy={last.y}
              r={6}
              fill={t.accent}
              stroke={t.dark}
              strokeWidth={2.5}
            />
            {!hide ? (
              <SvgText
                x={Math.min(last.x, width - 10)}
                y={last.y + 24}
                textAnchor="end"
                fill={t.onDark}
                fontSize={12}
                fontWeight="700"
              >
                {formatCompact(values[values.length - 1])}
              </SvgText>
            ) : null}
          </Svg>
        ) : (
          <View style={{ height: HEIGHT }} />
        )}
      </View>

      <View className="mt-1.5 flex-row justify-between px-0.5">
        {labels.map((label, i) => (
          <AppText key={`${label}-${i}`} className="text-[11px] text-dark-muted">
            {label}
          </AppText>
        ))}
      </View>
    </View>
  );
}
