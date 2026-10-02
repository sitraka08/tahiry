import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { AppSheet, AppText, Button, MoneyField, type SheetMethods } from '@/components';

import { depositSchema, type DepositFormValues } from '../schemas/goal-schema';
import type { GoalItem } from '../types';

type Props = {
  sheetRef: React.Ref<SheetMethods>;
  goal: GoalItem | null;
  onSubmit: (goal: GoalItem, values: DepositFormValues) => void;
};

function DepositForm({ goal, onSubmit }: { goal: GoalItem; onSubmit: Props['onSubmit'] }) {
  const { control, handleSubmit, formState } = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: '' },
  });

  return (
    <View className="gap-3 pt-2">
      <AppText weight="bold" className="text-base">
        Ajouter à « {goal.name} »
      </AppText>
      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <MoneyField
            label="Montant"
            value={field.value}
            onChangeValue={field.onChange}
            error={formState.errors.amount?.message}
          />
        )}
      />
      <Button label="Ajouter" onPress={handleSubmit((v) => onSubmit(goal, v))} />
    </View>
  );
}

export function DepositSheet({ sheetRef, goal, onSubmit }: Props) {
  return (
    <AppSheet sheetRef={sheetRef}>
      {goal ? (
        <DepositForm key={`${goal.id}-${goal.saved}`} goal={goal} onSubmit={onSubmit} />
      ) : null}
    </AppSheet>
  );
}
