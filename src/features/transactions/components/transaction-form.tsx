import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Check } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ScrollView, Switch, TextInput, View } from 'react-native';

import { AppSheet, AppText, Button, Chip, Segmented, type SheetMethods } from '@/components';
import { formatNumber } from '@/lib/money';
import { useThemeTokens } from '@/theme';

import { useCategories, createCategory } from '../hooks/use-categories';
import { transactionSchema, type TransactionFormValues } from '../schemas/transaction-schema';
import type { AccountOption, TransactionType } from '../types';
import { AmountInput } from './amount-input';
import { formatDateChip } from '@/lib/dates';

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
  const sheetRef = useRef<SheetMethods>(null);
  const [newCategory, setNewCategory] = useState('');
  const [now] = useState(Date.now);
  const outCategories = useCategories('out');
  const inCategories = useCategories('in');

  const { control, handleSubmit, setValue, formState } = useForm<TransactionFormValues>({
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
  const categories = type === 'in' ? inCategories : outCategories;
  const fromLabel =
    type === 'in' ? 'Reçu sur' : type === 'transfer' ? 'Depuis le compte' : 'Payé avec';
  const { errors } = formState;

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
        contentContainerClassName="gap-3.5 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-5">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Segmented options={TYPES} value={field.value} onChange={changeType} />
            )}
          />
        </View>

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <AmountInput
              value={field.value}
              onChange={field.onChange}
              error={errors.amount?.message}
            />
          )}
        />

        <View className="gap-2">
          <AppText weight="medium" className="ml-5 text-[13px] text-muted">
            {fromLabel}
          </AppText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 px-5"
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
            <AppText weight="medium" className="ml-5 text-[13px] text-muted">
              Vers le compte
            </AppText>
            <Controller
              control={control}
              name="toAccountId"
              render={({ field }) => (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="gap-2 px-5"
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
              <AppText className="mx-5 text-xs text-danger">{errors.toAccountId.message}</AppText>
            ) : (
              <AppText className="mx-5 text-xs text-muted">
                Un transfert ne change pas ton solde total : l’argent change juste de place.
              </AppText>
            )}
          </View>
        ) : (
          <View className="mx-5 gap-2">
            <AppText weight="medium" className="text-[13px] text-muted">
              Motif
            </AppText>
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <View className="flex-row flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <Chip
                      key={c.id}
                      label={c.label}
                      selected={field.value === c.id}
                      onPress={() => field.onChange(c.id)}
                    />
                  ))}
                  <Chip label="+ Créer" dashed onPress={() => sheetRef.current?.present()} />
                </View>
              )}
            />
            {errors.categoryId ? (
              <AppText className="text-xs text-danger">{errors.categoryId.message}</AppText>
            ) : null}
          </View>
        )}

        <View className="mx-5 flex-row gap-2">
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextInput
                accessibilityLabel="Note"
                placeholder="Note (facultatif)"
                placeholderTextColor="#8A8D78"
                value={field.value}
                onChangeText={field.onChange}
                className="h-11 flex-1 rounded-[14px] bg-card px-3.5 font-gs text-sm text-ink"
              />
            )}
          />
          <View className="h-11 flex-row items-center gap-1.5 rounded-[14px] bg-card px-3">
            <Calendar size={16} color={t.ink} strokeWidth={1.8} />
            <AppText className="text-[13px]">{formatDateChip(initialValues?.date ?? now)}</AppText>
          </View>
        </View>

        <Controller
          control={control}
          name="recurring"
          render={({ field }) => (
            <View className="mx-5 flex-row items-center justify-between">
              <AppText className="text-[13px]">Répéter chaque mois et me le rappeler</AppText>
              <Switch
                value={field.value}
                onValueChange={field.onChange}
                trackColor={{ true: t.dark, false: t.line }}
                thumbColor={field.value ? t.accent : t.tile}
              />
            </View>
          )}
        />
      </ScrollView>

      <View className="absolute inset-x-5 bottom-6">
        <Button
          label={submitLabel}
          variant="accent"
          icon={<Check size={20} color={t.onAccent} strokeWidth={2} />}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <AppSheet sheetRef={sheetRef}>
        <View className="gap-3 pt-2">
          <AppText weight="bold" className="text-base">
            Nouveau motif
          </AppText>
          <TextInput
            accessibilityLabel="Nom du motif"
            placeholder="Ex. Abonnement"
            placeholderTextColor="#8A8D78"
            value={newCategory}
            onChangeText={setNewCategory}
            className="h-12 rounded-[14px] bg-card px-3.5 font-gs text-base text-ink"
          />
          <Button label="Ajouter" onPress={addCategory} />
        </View>
      </AppSheet>
    </View>
  );
}
