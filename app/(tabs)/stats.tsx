import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Segmented } from '@/components';
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
  const router = useRouter();
  const [period, setPeriod] = useState<Period>('month');
  const stats = useStats(period);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="flex-row items-center justify-between gap-2 px-4 pt-6">
        <AppText accessibilityRole="header" variant="display">
          Stats
        </AppText>
        <View className="flex-row gap-1.5">
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/budgets')}
            className="h-11 justify-center rounded-full bg-tile px-4 active:opacity-80"
          >
            <AppText variant="caption" weight="bold">
              Budgets
            </AppText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/goals')}
            className="h-11 justify-center rounded-full bg-tile px-4 active:opacity-80"
          >
            <AppText variant="caption" weight="bold">
              Objectifs
            </AppText>
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 mt-4">
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
