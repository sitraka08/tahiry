import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Headline, Segmented } from '@/components';
import {
  BalanceChart,
  SpendingBreakdown,
  StatTiles,
  useStats,
  type Period,
} from '@/features/stats';

const PERIODS: { value: Period; label: string }[] = [
  { value: 'week', label: 'Semaine' },
  { value: 'month', label: '30 jours' },
  { value: 'year', label: 'Année' },
];

export default function Stats() {
  const [period, setPeriod] = useState<Period>('month');
  const stats = useStats(period);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="px-5 pt-5">
        <Headline lead="Statistiques" />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-5 mt-3.5">
          <Segmented options={PERIODS} value={period} onChange={setPeriod} />
        </View>
        <StatTiles income={stats.income} expense={stats.expense} saved={stats.saved} />
        <BalanceChart
          period={period}
          labels={stats.labels}
          values={stats.values}
          change={stats.change}
        />
        <SpendingBreakdown categories={stats.categories} />
      </ScrollView>
    </SafeAreaView>
  );
}
