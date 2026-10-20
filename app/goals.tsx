import { Plus } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Headline, IconButton, ScreenHeader, type SheetMethods } from '@/components';
import { useAccounts } from '@/features/accounts';
import {
  DepositSheet,
  GoalCard,
  GoalSheet,
  addDeposit,
  createGoal,
  useGoals,
  type GoalItem,
} from '@/features/goals';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';
import { toast } from '@/lib/toast-store';

export default function Goals() {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const { items, total, accountNames } = useGoals();
  const { accounts } = useAccounts();
  const [now] = useState(Date.now);
  const [target, setTarget] = useState<GoalItem | null>(null);
  const goalRef = useRef<SheetMethods>(null);
  const depositRef = useRef<SheetMethods>(null);

  const openDeposit = (goal: GoalItem) => {
    setTarget(goal);
    requestAnimationFrame(() => depositRef.current?.present());
  };
  const openGoalSheet = () => {
    if (accounts.length === 0) {
      Alert.alert('Ajoute d’abord un compte', 'Un objectif est mis de côté sur un compte.');
      return;
    }
    goalRef.current?.present();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="Objectifs"
        right={
          <IconButton icon={Plus} label="Nouvel objectif" tone="accent" onPress={openGoalSheet} />
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 mt-3.5">
          <Headline lead="Mettre de côté, " highlight="pas à pas" tail="." />
          <AppText className="mt-2 text-sm text-muted">
            {fmt(total)} mis de côté
            {accountNames.length > 0 ? ` sur ${accountNames.join(', ')}` : ''}
          </AppText>
        </View>

        <View className="mx-4 mt-4 gap-2.5">
          {items.map((goal, i) => (
            <GoalCard key={goal.id} goal={goal} dark={i === 0} now={now} onDeposit={openDeposit} />
          ))}
          <Pressable
            accessibilityRole="button"
            onPress={openGoalSheet}
            className="h-16 flex-row items-center justify-center gap-2 rounded-card border-[1.5px] border-dashed border-seg3 active:opacity-70"
          >
            <Plus size={20} color={t.ink} strokeWidth={1.8} />
            <AppText weight="medium" className="text-sm">
              Nouvel objectif : rentrée, voyage, terrain…
            </AppText>
          </Pressable>
        </View>
      </ScrollView>

      <GoalSheet
        sheetRef={goalRef}
        accounts={accounts.map((a) => ({ id: a.id, name: a.name }))}
        onSubmit={(values) => {
          createGoal(values);
          toast('Objectif créé');
          goalRef.current?.dismiss();
        }}
      />
      <DepositSheet
        sheetRef={depositRef}
        goal={target}
        onSubmit={(goal, values) => {
          addDeposit(goal.id, values);
          toast('Argent mis de côté');
          depositRef.current?.dismiss();
        }}
      />
    </SafeAreaView>
  );
}
