import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { TextInput, View } from 'react-native';

import { AppSheet, AppText, Button, Chip, Segmented, type SheetMethods } from '@/components';
import { formatNumber, parseAmount } from '@/lib/money';
import { useThemeTokens } from '@/theme';

import { debtSchema, type DebtFormValues } from '../schemas/debt-schema';
import type { AccountOption } from '../types';

const DUE: { label: string; days: number | null }[] = [
  { label: 'Sans date', days: null },
  { label: '1 semaine', days: 7 },
  { label: '1 mois', days: 30 },
  { label: '3 mois', days: 90 },
];

type Props = {
  sheetRef: React.Ref<SheetMethods>;
  accounts: AccountOption[];
  onSubmit: (values: DebtFormValues) => void;
};

function DebtForm({ accounts, onSubmit }: Omit<Props, 'sheetRef'>) {
  const t = useThemeTokens();
  const { control, handleSubmit, formState } = useForm<DebtFormValues>({
    resolver: zodResolver(debtSchema),
    defaultValues: {
      direction: 'lent',
      person: '',
      amount: '',
      accountId: accounts[0]?.id,
      dueInDays: null,
    },
  });
  const direction = useWatch({ control, name: 'direction' });

  return (
    <View className="gap-3 pt-2">
      <AppText weight="bold" className="text-base">
        Nouvelle dette ou nouveau prêt
      </AppText>

      <Controller
        control={control}
        name="direction"
        render={({ field }) => (
          <Segmented
            options={[
              { value: 'lent', label: 'On me doit' },
              { value: 'borrowed', label: 'Je dois' },
            ]}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="person"
        render={({ field }) => (
          <TextInput
            accessibilityLabel="Nom"
            placeholder="Nom de la personne"
            placeholderTextColor={t.muted}
            value={field.value}
            onChangeText={field.onChange}
            className="h-12 rounded-[14px] bg-card px-3.5 py-0 font-gs text-[15px] text-ink"
          />
        )}
      />
      {formState.errors.person ? (
        <AppText className="-mt-1.5 text-xs text-danger">{formState.errors.person.message}</AppText>
      ) : null}

      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <View className="h-12 flex-row items-center rounded-[14px] bg-card px-3.5">
            <TextInput
              accessibilityLabel="Montant"
              placeholder="Montant"
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
      {formState.errors.amount ? (
        <AppText className="-mt-1.5 text-xs text-danger">{formState.errors.amount.message}</AppText>
      ) : null}

      <AppText weight="medium" className="text-[13px] text-muted">
        {direction === 'lent' ? 'Prêté depuis' : 'Reçu sur'}
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

      <AppText weight="medium" className="text-[13px] text-muted">
        À rembourser dans
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

      <Button label="Ajouter" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export function DebtSheet({ sheetRef, accounts, onSubmit }: Props) {
  return (
    <AppSheet sheetRef={sheetRef}>
      <DebtForm accounts={accounts} onSubmit={onSubmit} />
    </AppSheet>
  );
}
