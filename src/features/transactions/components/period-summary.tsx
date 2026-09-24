import { View } from 'react-native';

import { AppText } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';

type Props = { income: number; expense: number; label: string };

export function PeriodSummary({ income, expense, label }: Props) {
  const fmt = useAmountMask();
  return (
    <View className="mx-5 mt-3.5 flex-row gap-2.5">
      <View className="flex-1 gap-1 rounded-[18px] bg-accent px-3.5 py-3">
        <AppText className="text-xs text-on-accent">Entrées · {label}</AppText>
        <AppText weight="bold" className="text-lg text-on-accent">
          +{fmt(income)}
        </AppText>
      </View>
      <View className="flex-1 gap-1 rounded-[18px] bg-dark px-3.5 py-3">
        <AppText className="text-xs text-dark-muted">Sorties · {label}</AppText>
        <AppText weight="bold" className="text-lg text-on-dark">
          {'−'}
          {fmt(expense)}
        </AppText>
      </View>
    </View>
  );
}
