import { View } from 'react-native';

import { AppText } from '@/components';
import { formatNumber } from '@/lib/money';

type Props = { counted: number; expected: number };

export function CountSummary({ counted, expected }: Props) {
  const gap = counted - expected;
  const sign = gap > 0 ? '+' : '−';

  return (
    <View className="mx-5 mt-4 flex-row flex-wrap gap-3 rounded-[22px] bg-dark px-[18px] py-4">
      <View className="w-[46%] gap-0.5">
        <AppText className="text-xs text-dark-muted">Compté</AppText>
        <AppText weight="bold" className="text-[22px] text-on-dark">
          {formatNumber(counted)} Ar
        </AppText>
      </View>
      <View className="w-[46%] gap-0.5">
        <AppText className="text-xs text-dark-muted">Attendu par l’app</AppText>
        <AppText weight="bold" className="text-[22px] text-on-dark">
          {formatNumber(expected)} Ar
        </AppText>
      </View>
      <View className="w-full rounded-xl bg-accent px-3 py-2.5">
        <AppText weight="bold" className="text-sm text-on-accent">
          {gap === 0
            ? 'Parfait, tout est juste.'
            : `Écart : ${sign}${formatNumber(Math.abs(gap))} Ar`}
        </AppText>
      </View>
    </View>
  );
}
