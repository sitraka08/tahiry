import { useRouter } from 'expo-router';
import {
  Bell,
  ChevronRight,
  Coins,
  PiggyBank,
  Repeat,
  Settings,
  Target,
  Wallet,
} from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppText,
  IconTile,
  ListRow,
  ProgressBar,
  TopoPattern,
  WalletIllustration,
} from '@/components';
import { useAccounts } from '@/features/accounts';
import { useBudget } from '@/features/budgets';
import { useDebts } from '@/features/debts';
import { useGoals } from '@/features/goals';
import { useReminders } from '@/features/reminders';
import { useUserName } from '@/features/settings';
import { formatUpdated } from '@/lib/dates';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

function Chevron() {
  const t = useThemeTokens();
  return <ChevronRight size={18} color={t.muted} strokeWidth={2} />;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <AppText
      variant="caption"
      weight="bold"
      tone="muted"
      style={{ letterSpacing: 0.6 }}
      className="px-4 pb-1 pt-6 uppercase"
    >
      {children}
    </AppText>
  );
}

export default function More() {
  const router = useRouter();
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const name = useUserName();
  const { accounts, total } = useAccounts();
  const { summary: debts } = useDebts();
  const { view, hasBudget, monthLabel } = useBudget();
  const { items: goals } = useGoals();
  const { pending, items: reminders } = useReminders();
  const lastCount = accounts
    .filter((a) => a.type === 'cash' && a.countedAt)
    .reduce<number | null>((max, a) => Math.max(max ?? 0, a.countedAt ?? 0), null);
  const nextReminder = reminders[0]?.title;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView contentContainerClassName="pb-28" showsVerticalScrollIndicator={false}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profil et réglages"
          onPress={() => router.push('/settings')}
          className="mx-4 mt-6 flex-row items-center gap-3.5 overflow-hidden rounded-card bg-card py-3 pl-4 pr-2 active:opacity-80"
        >
          <TopoPattern color={t.ink} />
          <View className="size-14 items-center justify-center rounded-full bg-accent">
            <AppText variant="title" className="text-on-accent">
              {(name || 'T').slice(0, 1).toUpperCase()}
            </AppText>
          </View>
          <View className="flex-1">
            <AppText variant="title" numberOfLines={1}>
              {name || 'Mon profil'}
            </AppText>
            <AppText variant="caption" tone="muted">
              Profil et réglages
            </AppText>
          </View>
          <WalletIllustration />
        </Pressable>

        <SectionLabel>Argent</SectionLabel>
        <ListRow
          leading={<IconTile icon={Wallet} color="catBlue" size="md" />}
          title="Comptes"
          subtitle={`${accounts.length} compte${accounts.length > 1 ? 's' : ''} · ${fmt(total)}`}
          trailing={<Chevron />}
          onPress={() => router.push('/accounts')}
        />
        <ListRow
          leading={<IconTile icon={Repeat} color="catViolet" size="md" />}
          title="Dettes et prêts"
          subtitle={`On me doit ${fmt(debts.owedToMe, false)} · Je dois ${fmt(debts.iOwe, false)}`}
          trailing={<Chevron />}
          onPress={() => router.push('/debts')}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Budget de ${monthLabel}`}
          onPress={() => router.push('/budgets')}
          className="min-h-16 flex-row items-center gap-3 px-4 py-2 active:bg-tile"
        >
          <IconTile icon={PiggyBank} color="catOrange" size="md" />
          <View className="flex-1 gap-1.5">
            <View className="flex-row justify-between">
              <AppText variant="body" weight="medium">
                Budget de {monthLabel}
              </AppText>
              {hasBudget ? (
                <AppText variant="caption" tone="muted">
                  {Math.round(view.percent)} %
                </AppText>
              ) : null}
            </View>
            {hasBudget ? (
              <ProgressBar value={view.percent} />
            ) : (
              <AppText variant="caption" tone="muted">
                Aucun budget défini
              </AppText>
            )}
          </View>
          <Chevron />
        </Pressable>
        <ListRow
          leading={<IconTile icon={Target} color="catRose" size="md" />}
          title="Objectifs"
          subtitle={goals.length ? `${goals.length} en cours` : 'Aucun objectif'}
          trailing={<Chevron />}
          onPress={() => router.push('/goals')}
        />

        <SectionLabel>Outils</SectionLabel>
        <ListRow
          leading={<IconTile icon={Coins} color="catSand" size="md" />}
          title="Comptage de caisse"
          subtitle={lastCount ? formatUpdated(lastCount, true) : 'Compte tes espèces'}
          trailing={<Chevron />}
          onPress={() => router.push('/cash-count')}
        />
        <ListRow
          leading={<IconTile icon={Bell} color="catTeal" size="md" />}
          title="Rappels"
          subtitle={nextReminder ?? 'Aucun rappel'}
          trailing={
            pending > 0 ? (
              <View className="h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5">
                <AppText weight="bold" className="text-xs text-on-accent">
                  {pending}
                </AppText>
              </View>
            ) : (
              <Chevron />
            )
          }
          onPress={() => router.push('/reminders')}
        />
        <ListRow
          leading={<IconTile icon={Settings} color="subtle" size="md" />}
          title="Réglages"
          subtitle="Apparence, code PIN, sauvegarde"
          trailing={<Chevron />}
          onPress={() => router.push('/settings')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
