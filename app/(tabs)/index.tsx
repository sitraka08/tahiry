import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Bell, Plus } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppText,
  BalanceCard,
  IconButton,
  PressableFeedback,
  QuickActions,
  SectionHeader,
} from '@/components';
import { AccountCard, AddAccountCard, useAccounts } from '@/features/accounts';
import { GoalHighlight, highlightGoal, useGoals } from '@/features/goals';
import { useReminders } from '@/features/reminders';
import { useUserName } from '@/features/settings';
import { TransactionRow, useMonthTotals, useTransactions } from '@/features/transactions';
import { useUiStore } from '@/lib/ui-store';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useCountUp } from '@/lib/use-count-up';
import { accountVisual } from '@/lib/visuals';
import { useThemeTokens } from '@/theme';

const DAY = 86_400_000;
const enter = (step: number) => FadeInDown.delay(step * 60).duration(320);

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View className="flex-1">
      <AppText variant="micro" tone="muted">
        {label}
      </AppText>
      <AppText variant="body" weight="bold" tone={accent ? 'accent' : 'ink'} numberOfLines={1}>
        {value}
      </AppText>
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const { accounts, total } = useAccounts();
  const shownTotal = useCountUp(total);
  const { items } = useTransactions({ limit: 5 });
  const { items: goals } = useGoals();
  const { pending } = useReminders();
  const name = useUserName();
  const hideAmounts = useUiStore((s) => s.hideAmounts);
  const setHideAmounts = useUiStore((s) => s.setHideAmounts);
  const [now] = useState(Date.now);
  const { income, expense } = useMonthTotals(now - 30 * DAY, now + DAY);
  const net = income - expense;
  const goal = highlightGoal(goals);
  const markColors = accounts.slice(0, 3).map((a) => t[accountVisual(a.type).color]);

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView contentContainerClassName="pb-28" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-4 pt-4">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profil et réglages"
            onPress={() => router.push('/settings')}
            className="min-h-11 flex-row items-center gap-3"
          >
            <View className="size-9 items-center justify-center rounded-full bg-accent">
              <AppText weight="bold" className="text-body text-on-accent">
                {(name || 'T').slice(0, 1).toUpperCase()}
              </AppText>
            </View>
            <AppText variant="title">{name ? `Bonjour ${name}` : 'Bonjour'}</AppText>
          </Pressable>
          <IconButton
            icon={Bell}
            label="Rappels"
            badge={pending}
            onPress={() => router.push('/reminders')}
          />
        </View>

        <Animated.View entering={enter(0)} style={{ marginTop: 16 }}>
          <BalanceCard
            amount={fmt(shownTotal, false)}
            holder={name || 'Tahiry'}
            hidden={hideAmounts}
            onToggleHidden={() => setHideAmounts(!hideAmounts)}
            change={{
              label: `${net >= 0 ? '+' : '−'}${fmt(Math.abs(net), false)} · 30 j`,
              positive: net >= 0,
            }}
            colors={markColors}
          />
        </Animated.View>
        <Animated.View entering={enter(1)}>
          <View className="flex-row gap-3 px-5 pt-4">
            <Stat label="Entrées · 30 j" value={`+${fmt(income, false)}`} accent />
            <Stat label="Sorties · 30 j" value={`−${fmt(expense, false)}`} />
            <Stat label="Par jour" value={`−${fmt(Math.round(expense / 30), false)}`} />
          </View>
          <QuickActions onPick={(type) => router.push(`/add-transaction?type=${type}`)} />
        </Animated.View>

        <Animated.View entering={enter(2)}>
          <SectionHeader
            title="Comptes"
            actionLabel="Tout voir"
            onAction={() => router.push('/accounts')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 px-4"
          >
            {accounts.map((a) => (
              <AccountCard
                key={a.id}
                account={a}
                total={total}
                onPress={() => router.push('/accounts')}
              />
            ))}
            <AddAccountCard onPress={() => router.push('/accounts')} />
          </ScrollView>
        </Animated.View>

        {goal ? (
          <Animated.View entering={enter(3)}>
            <GoalHighlight goal={goal} onPress={() => router.push('/goals')} />
          </Animated.View>
        ) : null}

        <SectionHeader
          title="Récents"
          actionLabel="Historique"
          onAction={() => router.push('/history')}
        />
        {items.length === 0 ? (
          <PressableFeedback
            accessibilityRole="button"
            onPress={() => router.push('/add-transaction')}
            className="mx-4 items-center gap-2 rounded-card border border-dashed border-outline px-4 py-6"
          >
            <View className="size-11 items-center justify-center rounded-full bg-accent">
              <Plus size={22} color={t.onAccent} strokeWidth={2.2} />
            </View>
            <AppText variant="body" weight="bold">
              Ajoute ta première opération
            </AppText>
            <AppText variant="caption" tone="muted" className="text-center">
              Dépense, revenu ou transfert : tout apparaîtra ici.
            </AppText>
          </PressableFeedback>
        ) : (
          items.map((item) => (
            <TransactionRow
              key={item.id}
              item={item}
              onPress={() => router.push(`/transaction/${item.id}`)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
