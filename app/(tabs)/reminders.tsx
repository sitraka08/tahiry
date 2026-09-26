import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useRef } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Headline, IconButton, type SheetMethods } from '@/components';
import { useAccounts } from '@/features/accounts';
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

export default function Reminders() {
  const router = useRouter();
  const { items, summary, now } = useReminders();
  const { accounts } = useAccounts();
  const frequency = useCashCountFrequency();
  const sheetRef = useRef<SheetMethods>(null);

  const openItem = (item: ReminderItem) => {
    if (item.source === 'debt') {
      router.push('/debts');
      return;
    }
    Alert.alert(item.title, undefined, [
      { text: 'Marquer payé', onPress: () => markReminderPaid(item) },
      { text: 'Supprimer', style: 'destructive', onPress: () => deleteReminder(item.id) },
      { text: 'Annuler', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="flex-row items-center justify-between px-5 pt-5">
        <Headline lead="Rappels" />
        <IconButton
          icon={Plus}
          label="Ajouter un rappel"
          tone="accent"
          onPress={() => sheetRef.current?.present()}
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <RemindersSummary summary={summary} />
        <View className="mx-5 mt-[18px]">
          <AppText weight="bold" className="text-[17px]">
            À venir
          </AppText>
          <View className="mt-2">
            {items.map((item) => (
              <ReminderRow key={item.key} item={item} now={now} onPress={openItem} />
            ))}
            <CashCountRow frequency={frequency} onChange={setCashCountFrequency} />
          </View>
        </View>
      </ScrollView>

      <ReminderSheet
        sheetRef={sheetRef}
        accounts={accounts.map((a) => ({ id: a.id, name: a.name }))}
        onSubmit={async (values) => {
          sheetRef.current?.dismiss();
          await createReminder(values);
        }}
      />
    </SafeAreaView>
  );
}
