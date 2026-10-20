import { PiggyBank, Pencil } from 'lucide-react-native';
import { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, IconButton, ScreenHeader, type SheetMethods } from '@/components';
import {
  BudgetAlert,
  BudgetLineRow,
  BudgetSheet,
  BudgetSummary,
  saveBudget,
  useBudget,
} from '@/features/budgets';
import { useThemeTokens } from '@/theme';
import { toast } from '@/lib/toast-store';

const preposition = (month: string) => (/^[aeiouhéèô]/i.test(month) ? "d'" : 'de ');

export default function Budgets() {
  const t = useThemeTokens();
  const { view, alerts, limits, categories, monthLabel, prevMonthLabel, hasBudget } = useBudget();
  const sheetRef = useRef<SheetMethods>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title={`Budget ${preposition(monthLabel)}${monthLabel}`}
        right={
          <IconButton
            icon={Pencil}
            label="Modifier les budgets"
            onPress={() => sheetRef.current?.present()}
          />
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        {hasBudget ? (
          <>
            <BudgetSummary view={view} />
            <BudgetAlert monthLabel={prevMonthLabel} alerts={alerts} />
            <View className="mx-4 mt-5">
              <AppText weight="bold" className="text-headline">
                Par motif
              </AppText>
              <View className="mt-2.5 gap-2">
                {view.lines.map((line) => (
                  <BudgetLineRow key={line.key} line={line} />
                ))}
              </View>
            </View>
          </>
        ) : (
          <View className="mx-4 mt-6 items-center gap-3 rounded-card border border-dashed border-seg3 px-4 py-8">
            <View className="size-12 items-center justify-center rounded-full bg-accent">
              <PiggyBank size={24} color={t.onAccent} strokeWidth={1.8} />
            </View>
            <AppText weight="bold" className="text-base">
              Fixe ton budget du mois
            </AppText>
            <AppText className="text-center text-caption text-muted">
              Choisis un montant total et, si tu veux, une limite par motif. On te dit combien tu
              peux dépenser chaque jour.
            </AppText>
            <Button label="Définir mon budget" onPress={() => sheetRef.current?.present()} />
          </View>
        )}
      </ScrollView>

      <BudgetSheet
        sheetRef={sheetRef}
        categories={categories}
        limits={limits}
        onSubmit={(values) => {
          saveBudget(values);
          toast('Budget enregistré');
          sheetRef.current?.dismiss();
        }}
      />
    </SafeAreaView>
  );
}
