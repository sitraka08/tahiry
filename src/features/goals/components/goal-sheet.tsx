import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import {
  AppSheet,
  AppText,
  Button,
  Chip,
  MoneyField,
  TextField,
  type SheetMethods,
} from '@/components';

import { goalSchema, type GoalFormValues } from '../schemas/goal-schema';
import type { AccountOption } from '../types';

const DUE = [
  { label: 'Sans date', months: null },
  { label: '3 mois', months: 3 },
  { label: '6 mois', months: 6 },
  { label: '1 an', months: 12 },
  { label: '2 ans', months: 24 },
];

type Props = {
  sheetRef: React.Ref<SheetMethods>;
  accounts: AccountOption[];
  onSubmit: (values: GoalFormValues) => void;
};

function GoalForm({ accounts, onSubmit }: Omit<Props, 'sheetRef'>) {
  const { control, handleSubmit, formState } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: { name: '', target: '', dueInMonths: 6, accountId: accounts[0]?.id ?? null },
  });

  return (
    <View className="gap-3 pt-2">
      <AppText weight="bold" className="text-base">
        Nouvel objectif
      </AppText>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            label="Nom"
            placeholder="Ex. Rentrée, voyage, terrain…"
            value={field.value}
            onChangeText={field.onChange}
            error={formState.errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="target"
        render={({ field }) => (
          <MoneyField
            label="Montant à atteindre"
            value={field.value}
            onChangeValue={field.onChange}
            error={formState.errors.target?.message}
          />
        )}
      />

      <AppText weight="medium" className="text-[13px] text-muted">
        Échéance
      </AppText>
      <Controller
        control={control}
        name="dueInMonths"
        render={({ field }) => (
          <View className="flex-row flex-wrap gap-1.5">
            {DUE.map((d) => (
              <Chip
                key={d.label}
                label={d.label}
                selected={field.value === d.months}
                onPress={() => field.onChange(d.months)}
              />
            ))}
          </View>
        )}
      />

      <AppText weight="medium" className="text-[13px] text-muted">
        Mis de côté sur
      </AppText>
      <Controller
        control={control}
        name="accountId"
        render={({ field }) => (
          <View className="flex-row flex-wrap gap-1.5">
            {accounts.map((a) => (
              <Chip
                key={a.id}
                label={a.name}
                selected={field.value === a.id}
                onPress={() => field.onChange(a.id)}
              />
            ))}
          </View>
        )}
      />

      <Button label="Créer l’objectif" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export function GoalSheet({ sheetRef, accounts, onSubmit }: Props) {
  return (
    <AppSheet sheetRef={sheetRef}>
      <GoalForm accounts={accounts} onSubmit={onSubmit} />
    </AppSheet>
  );
}
