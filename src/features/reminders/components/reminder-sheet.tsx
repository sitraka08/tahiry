import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';

import { AppSheet, AppText, Button, Chip, type SheetMethods } from '@/components';
import { formatNumber, parseAmount } from '@/lib/money';
import { useThemeTokens } from '@/theme';

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
  const t = useThemeTokens();
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
          <TextInput
            accessibilityLabel="Titre"
            placeholder="Ex. Loyer, facture d’eau…"
            placeholderTextColor={t.muted}
            value={field.value}
            onChangeText={field.onChange}
            className="h-12 rounded-[14px] bg-card px-3.5 py-0 font-gs text-[15px] text-ink"
          />
        )}
      />
      {formState.errors.title ? (
        <AppText className="-mt-1.5 text-xs text-danger">{formState.errors.title.message}</AppText>
      ) : null}

      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <View className="h-12 flex-row items-center rounded-[14px] bg-card px-3.5">
            <TextInput
              accessibilityLabel="Montant"
              placeholder="Montant (facultatif)"
              placeholderTextColor={t.muted}
              keyboardType="number-pad"
              value={field.value}
              onChangeText={(text) => {
                const n = parseAmount(text);
                field.onChange(n ? formatNumber(n) : '');
              }}
              className="flex-1 py-0 font-gs-bold text-[15px] text-ink"
            />
            <AppText className="text-sm text-muted">Ar</AppText>
          </View>
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
