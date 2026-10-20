import { View } from 'react-native';

import { AppText } from '@/components';
import { withAlpha } from '@/lib/color';
import { formatNumber } from '@/lib/money';
import { useThemeTokens } from '@/theme';

type Props = { counted: number; expected: number };

export function CountSummary({ counted, expected }: Props) {
  const t = useThemeTokens();
  const gap = counted - expected;
  const sign = gap > 0 ? '+' : '−';
  const color = gap === 0 ? t.accent : gap < 0 ? t.danger : t.catSand;

  return (
    <View className="mx-4 mt-4 gap-3 rounded-card bg-card p-4">
      <View className="flex-row gap-3">
        <View className="flex-1 gap-0.5">
          <AppText variant="caption" tone="muted">
            Compté
          </AppText>
          <AppText variant="title" numberOfLines={1} adjustsFontSizeToFit>
            {formatNumber(counted)} Ar
          </AppText>
        </View>
        <View className="flex-1 gap-0.5">
          <AppText variant="caption" tone="muted">
            Attendu par l’app
          </AppText>
          <AppText variant="title" numberOfLines={1} adjustsFontSizeToFit>
            {formatNumber(expected)} Ar
          </AppText>
        </View>
      </View>
      <View
        style={{ backgroundColor: withAlpha(color, 0.14) }}
        className="rounded-tile px-3 py-2.5"
      >
        <AppText variant="caption" weight="bold" style={{ color }}>
          {gap === 0
            ? 'Parfait, tout est juste.'
            : `Écart : ${sign}${formatNumber(Math.abs(gap))} Ar`}
        </AppText>
      </View>
    </View>
  );
}
