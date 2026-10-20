import { View } from 'react-native';

import { AppText } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';

type Props = { income: number; expense: number; label: string };

export function PeriodSummary({ income, expense, label }: Props) {
  const fmt = useAmountMask();
  return (
    <View className="mx-4 mt-4 flex-row items-center gap-4 rounded-card bg-card px-4 py-3.5">
      <AppText variant="body" weight="bold" className="flex-1">
        {label}
      </AppText>
      <View className="items-end">
        <AppText variant="micro" tone="muted">
          Entrées
        </AppText>
        <AppText variant="body" weight="bold" tone="accent">
          +{fmt(income, false)}
        </AppText>
      </View>
      <View className="items-end">
        <AppText variant="micro" tone="muted">
          Sorties
        </AppText>
        <AppText variant="body" weight="bold">
          {'−'}
          {fmt(expense, false)}
        </AppText>
      </View>
    </View>
  );
}
