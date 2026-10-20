import { useState } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, Line, Polygon, Polyline, Text as SvgText } from 'react-native-svg';

import { AppText } from '@/components';
import { withAlpha } from '@/lib/color';
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
    <View className="mx-4 mt-3 rounded-card bg-card p-4">
      <View className="flex-row items-baseline justify-between gap-2">
        <AppText variant="body" weight="bold">
          Évolution du solde
        </AppText>
        {change !== null ? (
          <AppText
            weight="bold"
            style={{ backgroundColor: withAlpha(t.accent, 0.14) }}
            className="overflow-hidden rounded-full px-2.5 py-1 text-xs text-accent"
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
              <Line key={y} x1={0} x2={width} y1={y} y2={y} stroke={t.line} strokeDasharray="3 5" />
            ))}
            <Polygon
              points={`${line} ${last.x},${HEIGHT} ${first.x},${HEIGHT}`}
              fill={t.accent}
              fillOpacity={0.12}
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
              stroke={t.card}
              strokeWidth={2.5}
            />
            {!hide ? (
              <SvgText
                x={Math.min(last.x, width - 10)}
                y={last.y + 24}
                textAnchor="end"
                fill={t.ink}
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
          <AppText key={`${label}-${i}`} variant="micro" tone="muted">
            {label}
          </AppText>
        ))}
      </View>
    </View>
  );
}
