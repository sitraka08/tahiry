import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Bell, ChevronRight, Eye, EyeOff, Plus, Repeat, Settings, User } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Headline, IconButton } from '@/components';
import { AccountChip, useAccounts } from '@/features/accounts';
import { useDebts } from '@/features/debts';
import { useReminders } from '@/features/reminders';
import { useUserName } from '@/features/settings';
import { TransactionRow, useMonthTotals, useTransactions } from '@/features/transactions';
import { useUiStore } from '@/lib/ui-store';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

const DAY = 86_400_000;

export default function Home() {
  const router = useRouter();
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const { accounts, groups, total } = useAccounts();
  const { items } = useTransactions({ limit: 5 });
  const { summary: debts } = useDebts();
  const { pending } = useReminders();
  const name = useUserName();
  const hideAmounts = useUiStore((s) => s.hideAmounts);
  const setHideAmounts = useUiStore((s) => s.setHideAmounts);
  const [now] = useState(Date.now);
  const { income, expense } = useMonthTotals(now - 30 * DAY, now + DAY);
  const net = income - expense;
  const segColors = [t.accent, t.onDark, t.seg3, t.darkMuted];
  const visibleGroups = groups.filter((g) => g.accounts.length > 0);

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 pt-5">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profil et réglages"
            onPress={() => router.push('/settings')}
            className="flex-row items-center gap-2.5"
          >
            <View className="size-11 items-center justify-center rounded-full bg-accent">
              <User size={22} color={t.onAccent} strokeWidth={1.8} />
            </View>
            <View>
              <AppText className="text-[13px] text-muted">Bonjour,</AppText>
              <AppText weight="bold" className="text-base">
                {name || 'Bienvenue'}
              </AppText>
            </View>
          </Pressable>
          <View className="flex-row gap-2">
            <IconButton icon={Settings} label="Réglages" onPress={() => router.push('/settings')} />
            <IconButton
              icon={Bell}
              label="Rappels"
              badge={pending}
              onPress={() => router.push('/reminders')}
            />
          </View>
        </View>

        <View className="mx-5 mt-[18px]">
          <Headline lead="Ton argent suivi, " highlight="où qu’il soit" tail="." />
        </View>

        <View className="mx-5 mt-[18px] gap-3.5 rounded-3xl bg-dark p-5">
          <View className="flex-row items-center justify-between gap-2">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={hideAmounts ? 'Afficher les montants' : 'Masquer les montants'}
              onPress={() => setHideAmounts(!hideAmounts)}
              hitSlop={10}
              className="flex-row items-center gap-2"
            >
              <AppText className="text-sm text-dark-muted">
                Solde total · {accounts.length} compte{accounts.length > 1 ? 's' : ''}
              </AppText>
              {hideAmounts ? (
                <EyeOff size={16} color={t.darkMuted} strokeWidth={1.8} />
              ) : (
                <Eye size={16} color={t.darkMuted} strokeWidth={1.8} />
              )}
            </Pressable>
            <AppText
              weight="medium"
              className="overflow-hidden rounded-full bg-accent px-2.5 py-1 text-xs text-on-accent"
            >
              {net >= 0 ? '+' : '−'}
              {fmt(Math.abs(net), false)} Ar sur 30 j
            </AppText>
          </View>
          <AppText weight="bold" className="text-[38px] leading-[42px] text-on-dark">
            {fmt(total)}
          </AppText>
          <View className="h-2.5 flex-row gap-[3px]">
            {visibleGroups.map((g, i) => (
              <View
                key={g.type}
                style={{ flex: Math.max(g.total, 0) || 0.0001, backgroundColor: segColors[i] }}
                className="rounded-full"
              />
            ))}
          </View>
          <View className="flex-row flex-wrap gap-x-3.5 gap-y-1">
            {visibleGroups.map((g, i) => (
              <View key={g.type} className="flex-row items-center gap-1.5">
                <View style={{ backgroundColor: segColors[i] }} className="size-2 rounded-[2px]" />
                <AppText className="text-xs text-dark-muted">
                  {g.label} {total > 0 ? Math.round((g.total / total) * 100) : 0} %
                </AppText>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5 flex-row items-baseline justify-between px-5">
          <AppText weight="bold" className="text-[17px]">
            Mes comptes <AppText className="text-muted">· {accounts.length}</AppText>
          </AppText>
          <Pressable onPress={() => router.push('/accounts')}>
            <AppText weight="medium" className="text-[13px]">
              Voir tout
            </AppText>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2.5 px-5 pt-2.5"
        >
          {accounts.map((a) => (
            <AccountChip key={a.id} account={a} onPress={() => router.push('/accounts')} />
          ))}
        </ScrollView>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/debts')}
          className="mx-5 mt-3.5 flex-row items-center gap-3 rounded-[18px] border border-line bg-card px-3.5 py-3 active:opacity-80"
        >
          <View className="size-10 items-center justify-center rounded-[13px] bg-tile">
            <Repeat size={20} color={t.ink} strokeWidth={1.8} />
          </View>
          <View className="flex-1">
            <AppText weight="bold" className="text-[15px]">
              Dettes & prêts
            </AppText>
            <AppText className="text-xs text-muted">
              On me doit {fmt(debts.owedToMe, false)} · Je dois {fmt(debts.iOwe, false)}
            </AppText>
          </View>
          <ChevronRight size={18} color={t.ink} strokeWidth={2} />
        </Pressable>

        <View className="mx-5 mt-[18px]">
          <View className="flex-row items-baseline justify-between">
            <AppText weight="bold" className="text-[17px]">
              Derniers mouvements
            </AppText>
            <Pressable onPress={() => router.push('/history')}>
              <AppText weight="medium" className="text-[13px]">
                Tout l’historique
              </AppText>
            </Pressable>
          </View>
          {items.length === 0 ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/add-transaction')}
              className="mt-3 items-center gap-2 rounded-[20px] border border-dashed border-seg3 px-5 py-6 active:opacity-70"
            >
              <View className="size-11 items-center justify-center rounded-full bg-accent">
                <Plus size={22} color={t.onAccent} strokeWidth={2.2} />
              </View>
              <AppText weight="bold" className="text-[15px]">
                Ajoute ta première opération
              </AppText>
              <AppText className="text-center text-[13px] text-muted">
                Dépense, revenu ou transfert : tout apparaîtra ici.
              </AppText>
            </Pressable>
          ) : (
            items.map((item) => (
              <TransactionRow
                key={item.id}
                item={item}
                onPress={() => router.push(`/transaction/${item.id}`)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
