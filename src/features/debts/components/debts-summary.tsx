import { View } from 'react-native';

import { AppText } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';

import type { DebtSummary } from '../types';

const people = (n: number) => `${n} personne${n > 1 ? 's' : ''}`;

export function DebtsSummary({ summary }: { summary: DebtSummary }) {
  const fmt = useAmountMask();
  return (
    <View className="mx-4 mt-4 flex-row gap-2.5">
      <View className="flex-1 gap-1 rounded-card bg-accent p-3.5">
        <AppText className="text-xs text-on-accent">On me doit</AppText>
        <AppText weight="bold" className="text-xl text-on-accent">
          {fmt(summary.owedToMe)}
        </AppText>
        <AppText className="text-micro text-on-accent">{people(summary.owedToMeCount)}</AppText>
      </View>
      <View className="flex-1 gap-1 rounded-card bg-dark p-3.5">
        <AppText className="text-xs text-dark-muted">Je dois</AppText>
        <AppText weight="bold" className="text-xl text-on-dark">
          {fmt(summary.iOwe)}
        </AppText>
        <AppText className="text-micro text-dark-muted">{people(summary.iOweCount)}</AppText>
      </View>
    </View>
  );
}
