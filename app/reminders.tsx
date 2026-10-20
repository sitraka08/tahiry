import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useRef } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton, ScreenHeader, SectionHeader, type SheetMethods } from '@/components';
import { useAccounts } from '@/features/accounts';
import { GoalHighlight, highlightGoal, useGoals } from '@/features/goals';
import {
  CashCountRow,
  ReminderRow,
  ReminderSheet,
  RemindersSummary,
  createReminder,
  deleteReminder,
  markReminderPaid,
  setCashCountFrequency,
  useCashCountFrequency,
  useReminders,
  type ReminderItem,
} from '@/features/reminders';
import { toast } from '@/lib/toast-store';

export default function Reminders() {
  const router = useRouter();
  const { items, summary, now } = useReminders();
  const { accounts } = useAccounts();
  const frequency = useCashCountFrequency();
  const { items: goals } = useGoals();
  const goal = highlightGoal(goals);
  const sheetRef = useRef<SheetMethods>(null);

  const openItem = (item: ReminderItem) => {
    if (item.source === 'debt') {
      router.push('/debts');
      return;
    }
    Alert.alert(item.title, undefined, [
      {
        text: 'Marquer payé',
        onPress: async () => {
          await markReminderPaid(item);
          toast('Marqué comme payé');
        },
      },
      { text: 'Supprimer', style: 'destructive', onPress: () => deleteReminder(item.id) },
      { text: 'Annuler', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="Rappels"
        right={
          <IconButton
            icon={Plus}
            label="Ajouter un rappel"
            tone="accent"
            onPress={() => sheetRef.current?.present()}
          />
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <RemindersSummary summary={summary} />
        <SectionHeader title="À venir" />
        {items.map((item) => (
          <ReminderRow key={item.key} item={item} now={now} onPress={openItem} />
        ))}
        <CashCountRow frequency={frequency} onChange={setCashCountFrequency} />
        {goal ? <GoalHighlight goal={goal} onPress={() => router.push('/goals')} /> : null}
      </ScrollView>

      <ReminderSheet
        sheetRef={sheetRef}
        accounts={accounts.map((a) => ({ id: a.id, name: a.name }))}
        onSubmit={async (values) => {
          sheetRef.current?.dismiss();
          await createReminder(values);
          toast('Rappel ajouté');
        }}
      />
    </SafeAreaView>
  );
}
