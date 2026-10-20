import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Check } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ScrollView, Switch, View } from 'react-native';

import {
  AppSheet,
  AppText,
  Button,
  Chip,
  Segmented,
  TextField,
  type SheetMethods,
} from '@/components';
import { formatDateChip } from '@/lib/dates';
import { formatNumber, parseAmount } from '@/lib/money';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useBottomInset } from '@/lib/use-bottom-inset';
import { categoryVisual } from '@/lib/visuals';
import { useThemeTokens } from '@/theme';

import { applyKey, balanceAfter } from '../hooks/amount-keys';
import { useCategories, createCategory } from '../hooks/use-categories';
import { transactionSchema, type TransactionFormValues } from '../schemas/transaction-schema';
import type { AccountOption, TransactionType } from '../types';
import { AmountDisplay } from './amount-display';
import { AmountKeypad } from './amount-keypad';

const TYPES: { value: TransactionType; label: string }[] = [
  { value: 'out', label: 'Dépense' },
  { value: 'in', label: 'Revenu' },
  { value: 'transfer', label: 'Transfert' },
];

type Props = {
  accounts: AccountOption[];
  onSubmit: (values: TransactionFormValues) => void;
  initialValues?: Partial<TransactionFormValues>;
  submitLabel?: string;
};

export function TransactionForm({
  accounts,
  onSubmit,
  initialValues,
  submitLabel = 'Enregistrer',
}: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const bottomInset = useBottomInset(16);
  const sheetRef = useRef<SheetMethods>(null);
  const [newCategory, setNewCategory] = useState('');
  const [now] = useState(Date.now);
  const outCategories = useCategories('out');
  const inCategories = useCategories('in');

  const { control, handleSubmit, setValue, getValues, formState } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'out',
      amount: '',
      accountId: accounts[0]?.id,
      toAccountId: null,
      categoryId: null,
      note: '',
      date: now,
      recurring: false,
      ...initialValues,
    },
  });
  const type = useWatch({ control, name: 'type' });
  const accountId = useWatch({ control, name: 'accountId' });
  const amount = useWatch({ control, name: 'amount' });
  const account = accounts.find((a) => a.id === accountId);
  const hint = account
    ? `Solde ${account.name} après : ${fmt(balanceAfter(type, account.balance, parseAmount(amount)))}`
    : undefined;
  const categories = type === 'in' ? inCategories : outCategories;
  const fromLabel =
    type === 'in' ? 'Reçu sur' : type === 'transfer' ? 'Depuis le compte' : 'Payé avec';
  const { errors, isSubmitted } = formState;

  const pressKey = (key: Parameters<typeof applyKey>[1]) =>
    setValue('amount', applyKey(getValues('amount'), key), { shouldValidate: isSubmitted });

  const changeType = (next: TransactionType) => {
    setValue('type', next);
    setValue('categoryId', null);
    setValue('toAccountId', null);
  };

  const addCategory = () => {
    const label = newCategory.trim();
    if (!label || type === 'transfer') return;
    const created = createCategory(type, label);
    setValue('categoryId', created.id, { shouldValidate: true });
    setNewCategory('');
    sheetRef.current?.dismiss();
  };

  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="gap-4 pb-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Segmented options={TYPES} value={field.value} onChange={changeType} />
            )}
          />
        </View>

        <AmountDisplay value={amount} hint={hint} error={errors.amount?.message} />

        <View className="gap-2">
          <AppText variant="caption" weight="medium" tone="muted" className="ml-4">
            {fromLabel}
          </AppText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 px-4"
          >
            {accounts.map((a) => {
              const active = a.id === accountId;
              return (
                <Chip
                  key={a.id}
                  label={`${a.name} · ${formatNumber(a.balance)}`}
                  selected={active}
                  onPress={() => setValue('accountId', a.id, { shouldValidate: true })}
                />
              );
            })}
          </ScrollView>
        </View>

        {type === 'transfer' ? (
          <View className="gap-2">
            <AppText variant="caption" weight="medium" tone="muted" className="ml-4">
              Vers le compte
            </AppText>
            <Controller
              control={control}
              name="toAccountId"
              render={({ field }) => (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="gap-2 px-4"
                >
                  {accounts
                    .filter((a) => a.id !== accountId)
                    .map((a) => (
                      <Chip
                        key={a.id}
                        label={a.name}
                        selected={field.value === a.id}
                        onPress={() => field.onChange(a.id)}
                      />
                    ))}
                </ScrollView>
              )}
            />
            {errors.toAccountId ? (
              <AppText variant="caption" tone="danger" className="mx-4">
                {errors.toAccountId.message}
              </AppText>
            ) : (
              <AppText variant="caption" tone="muted" className="mx-4">
                Un transfert ne change pas ton solde total : l’argent change juste de place.
              </AppText>
            )}
          </View>
        ) : (
          <View className="gap-2">
            <AppText variant="caption" weight="medium" tone="muted" className="ml-4">
              Motif
            </AppText>
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerClassName="gap-2 px-4"
                >
                  {categories.map((c) => (
                    <Chip
                      key={c.id}
                      label={c.label}
                      color={t[categoryVisual(c.kind, c.key).color]}
                      selected={field.value === c.id}
                      onPress={() => field.onChange(c.id)}
                    />
                  ))}
                  <Chip label="+ Créer" dashed onPress={() => sheetRef.current?.present()} />
                </ScrollView>
              )}
            />
            {errors.categoryId ? (
              <AppText variant="caption" tone="danger" className="mx-4">
                {errors.categoryId.message}
              </AppText>
            ) : null}
          </View>
        )}

        <View className="mx-4 flex-row gap-2">
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextField
                className="flex-1"
                placeholder="Note (facultatif)"
                value={field.value ?? ''}
                onChangeText={field.onChange}
              />
            )}
          />
          <View className="h-12 flex-row items-center gap-1.5 self-start rounded-card bg-tile px-3">
            <Calendar size={16} color={t.ink} strokeWidth={1.8} />
            <AppText variant="caption">{formatDateChip(initialValues?.date ?? now)}</AppText>
          </View>
        </View>

        <Controller
          control={control}
          name="recurring"
          render={({ field }) => (
            <View className="mx-4 flex-row items-center justify-between gap-3">
              <AppText variant="caption" className="flex-1">
                Répéter chaque mois et me le rappeler
              </AppText>
              <Switch
                value={field.value}
                onValueChange={field.onChange}
                trackColor={{ true: t.accent, false: t.raised }}
                thumbColor={t.card}
              />
            </View>
          )}
        />
      </ScrollView>

      <AmountKeypad onKey={pressKey} />
      <View style={{ paddingBottom: bottomInset }} className="px-4 pt-2">
        <Button
          label={submitLabel}
          variant="accent"
          icon={<Check size={20} color={t.onAccent} strokeWidth={2} />}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <AppSheet sheetRef={sheetRef}>
        <View className="gap-3 pt-2">
          <AppText variant="headline">Nouveau motif</AppText>
          <TextField
            label="Nom du motif"
            placeholder="Ex. Abonnement"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <Button label="Ajouter" onPress={addCategory} />
        </View>
      </AppSheet>
    </View>
  );
}
