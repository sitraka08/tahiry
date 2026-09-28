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

import { reminderSchema, type ReminderFormValues } from '../schemas/reminder-schema';
import type { AccountOption, Repeat } from '../types';

const DUE = [
  { label: 'Aujourd’hui', days: 0 },
  { label: 'Demain', days: 1 },
  { label: '1 semaine', days: 7 },
  { label: '1 mois', days: 30 },
];

const REPEAT: { label: string; value: Repeat }[] = [
  { label: 'Une fois', value: 'none' },
  { label: 'Chaque semaine', value: 'weekly' },
  { label: 'Chaque mois', value: 'monthly' },
];

type Props = {
  sheetRef: React.Ref<SheetMethods>;
  accounts: AccountOption[];
  onSubmit: (values: ReminderFormValues) => void;
};

function ReminderForm({ accounts, onSubmit }: Omit<Props, 'sheetRef'>) {
  const { control, handleSubmit, formState } = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues: { title: '', amount: '', accountId: null, dueInDays: 7, repeat: 'none' },
  });

  return (
    <View className="gap-3 pt-2">
      <AppText weight="bold" className="text-base">
        Nouveau rappel
      </AppText>

      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextField
            label="Titre"
            placeholder="Ex. Loyer, facture d’eau…"
            value={field.value}
            onChangeText={field.onChange}
            error={formState.errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <MoneyField
            label="Montant (facultatif)"
            value={field.value}
            onChangeValue={field.onChange}
          />
        )}
      />

      <AppText weight="medium" className="text-[13px] text-muted">
        Payé avec
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
                onPress={() => field.onChange(field.value === a.id ? null : a.id)}
              />
            ))}
          </View>
        )}
      />

      <AppText weight="medium" className="text-[13px] text-muted">
        Échéance
      </AppText>
      <Controller
        control={control}
        name="dueInDays"
        render={({ field }) => (
          <View className="flex-row flex-wrap gap-1.5">
            {DUE.map((d) => (
              <Chip
                key={d.label}
                label={d.label}
                selected={field.value === d.days}
                onPress={() => field.onChange(d.days)}
              />
            ))}
          </View>
        )}
      />

      <Controller
        control={control}
        name="repeat"
        render={({ field }) => (
          <View className="flex-row flex-wrap gap-1.5">
            {REPEAT.map((r) => (
              <Chip
                key={r.value}
                label={r.label}
                selected={field.value === r.value}
                onPress={() => field.onChange(r.value)}
              />
            ))}
          </View>
        )}
      />

      <Button label="Ajouter le rappel" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export function ReminderSheet({ sheetRef, accounts, onSubmit }: Props) {
  return (
    <AppSheet sheetRef={sheetRef}>
      <ReminderForm accounts={accounts} onSubmit={onSubmit} />
    </AppSheet>
  );
}
