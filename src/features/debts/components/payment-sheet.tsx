import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';

import { AppSheet, AppText, Button, Chip, type SheetMethods } from '@/components';
import { formatNumber, parseAmount } from '@/lib/money';
import { useThemeTokens } from '@/theme';

import { remainingOf } from '../hooks/debt-math';
import { paymentSchema, type PaymentFormValues } from '../schemas/debt-schema';
import type { AccountOption, DebtItem } from '../types';

type Props = {
  sheetRef: React.Ref<SheetMethods>;
  debt: DebtItem | null;
  full: boolean;
  accounts: AccountOption[];
  onSubmit: (debt: DebtItem, values: PaymentFormValues) => void;
};

function PaymentForm({
  debt,
  full,
  accounts,
  onSubmit,
}: Omit<Props, 'sheetRef' | 'debt'> & { debt: DebtItem }) {
  const t = useThemeTokens();
  const remaining = remainingOf(debt);
  const schema = useMemo(() => paymentSchema(remaining), [remaining]);
  const { control, handleSubmit, formState } = useForm<PaymentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: full ? formatNumber(remaining) : '',
      accountId: debt.accountId ?? accounts[0]?.id,
    },
  });
  const borrowed = debt.direction === 'borrowed';

  return (
    <View className="gap-3 pt-2">
      <AppText weight="bold" className="text-base">
        {borrowed ? `Rembourser ${debt.person}` : `Paiement de ${debt.person}`}
      </AppText>
      <AppText className="text-[13px] text-muted">
        Reste à {borrowed ? 'rendre' : 'recevoir'} : {formatNumber(remaining)} Ar
      </AppText>

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
        {borrowed ? 'Payé avec' : 'Reçu sur'}
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

      <Button label="Enregistrer" onPress={handleSubmit((v) => onSubmit(debt, v))} />
    </View>
  );
}

export function PaymentSheet({ sheetRef, debt, full, accounts, onSubmit }: Props) {
  return (
    <AppSheet sheetRef={sheetRef}>
      {debt ? (
        <PaymentForm
          key={`${debt.id}-${debt.paid}-${full}`}
          debt={debt}
          full={full}
          accounts={accounts}
          onSubmit={onSubmit}
        />
      ) : null}
    </AppSheet>
  );
}
