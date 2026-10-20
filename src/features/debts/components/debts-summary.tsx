import { View } from 'react-native';

import { AppText } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import type { DebtSummary } from '../types';

const people = (n: number) => `${n} personne${n > 1 ? 's' : ''}`;

type TileProps = { label: string; amount: string; count: number; color: string };

function Tile({ label, amount, count, color }: TileProps) {
  return (
    <View className="flex-1 gap-1 rounded-card bg-card p-4">
      <AppText variant="caption" weight="medium" style={{ color }}>
        {label}
      </AppText>
      <AppText variant="title" numberOfLines={1} adjustsFontSizeToFit>
        {amount}
      </AppText>
      <AppText variant="micro" tone="muted">
        {people(count)}
      </AppText>
    </View>
  );
}

export function DebtsSummary({ summary }: { summary: DebtSummary }) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  return (
    <View className="mx-4 mt-4 flex-row gap-2">
      <Tile
        label="On me doit"
        amount={fmt(summary.owedToMe)}
        count={summary.owedToMeCount}
        color={t.catTeal}
      />
      <Tile
        label="Je dois"
        amount={fmt(summary.iOwe)}
        count={summary.iOweCount}
        color={t.catViolet}
      />
    </View>
  );
}
