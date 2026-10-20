import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { AppSheet, AppText, Button, MoneyField, type SheetMethods } from '@/components';
import { formatNumber } from '@/lib/money';

import { budgetSchema, type BudgetFormValues } from '../schemas/budget-schema';
import type { CategoryInfo } from '../types';

type Props = {
  sheetRef: React.Ref<SheetMethods>;
  categories: CategoryInfo[];
  limits: Map<number | null, number>;
  onSubmit: (values: BudgetFormValues) => void;
};

function BudgetForm({ categories, limits, onSubmit }: Omit<Props, 'sheetRef'>) {
  const { control, handleSubmit, formState } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      total: limits.get(null) ? formatNumber(limits.get(null) ?? 0) : '',
      limits: Object.fromEntries(
        categories.map((c) => [
          String(c.id),
          limits.get(c.id) ? formatNumber(limits.get(c.id) ?? 0) : '',
        ]),
      ),
    },
  });

  return (
    <View className="gap-3 pt-2">
      <AppText weight="bold" className="text-base">
        Budget du mois
      </AppText>
      <Controller
        control={control}
        name="total"
        render={({ field }) => (
          <MoneyField
            label="Budget total"
            placeholder="Ex. 600 000"
            value={field.value}
            onChangeValue={field.onChange}
            error={formState.errors.total?.message}
          />
        )}
      />
      <AppText weight="medium" className="text-caption text-muted">
        Par motif (facultatif)
      </AppText>
      <ScrollView
        style={{ maxHeight: 280 }}
        contentContainerClassName="gap-2.5"
        keyboardShouldPersistTaps="handled"
      >
        {categories.map((c) => (
          <Controller
            key={c.id}
            control={control}
            name={`limits.${c.id}`}
            render={({ field }) => (
              <MoneyField
                label={c.label}
                value={field.value ?? ''}
                onChangeValue={field.onChange}
              />
            )}
          />
        ))}
      </ScrollView>
      <Button label="Enregistrer" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export function BudgetSheet({ sheetRef, categories, limits, onSubmit }: Props) {
  return (
    <AppSheet sheetRef={sheetRef}>
      <BudgetForm categories={categories} limits={limits} onSubmit={onSubmit} />
    </AppSheet>
  );
}
