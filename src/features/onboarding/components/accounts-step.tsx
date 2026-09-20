import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';

import { AppText, Chip } from '@/components';
import { formatNumber, parseAmount } from '@/lib/money';

import { accountsStepSchema, type AccountsStepValues } from '../schemas/accounts-schema';
import type { AccountDraft } from '../types';
import { OnboardingShell } from './onboarding-shell';

const KINDS: { type: AccountDraft['type']; label: string; placeholder: string }[] = [
  { type: 'bank', label: 'Banque', placeholder: 'Ma banque' },
  { type: 'mobile', label: 'Mobile Money', placeholder: 'Mon mobile money' },
  { type: 'cash', label: 'Espèces', placeholder: 'Espèces' },
];

type Props = {
  initial: AccountDraft[];
  onSubmit: (accounts: AccountDraft[]) => void;
  onSkip: () => void;
};

export function AccountsStep({ initial, onSubmit, onSkip }: Props) {
  const { control, handleSubmit, formState } = useForm<AccountsStepValues>({
    resolver: zodResolver(accountsStepSchema),
    defaultValues: {
      accounts: initial.length ? initial : [{ type: 'cash', name: 'Espèces', balance: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'accounts' });

  return (
    <OnboardingShell
      step={0}
      title="Où gardes-tu ton argent ?"
      subtitle="Ajoute tes comptes et leur solde actuel. Tu pourras en ajouter d’autres plus tard."
      actionLabel="Continuer"
      onAction={handleSubmit((v) => onSubmit(v.accounts))}
      onSkip={onSkip}
    >
      <View className="flex-row flex-wrap gap-1.5">
        {KINDS.map((k) => (
          <Chip
            key={k.type}
            label={`+ ${k.label}`}
            dashed
            onPress={() => append({ type: k.type, name: '', balance: '' })}
          />
        ))}
      </View>

      {fields.map((field, index) => {
        const kind = KINDS.find((k) => k.type === field.type) ?? KINDS[0];
        const nameError = formState.errors.accounts?.[index]?.name?.message;
        return (
          <View key={field.id} className="gap-2 rounded-[18px] bg-card p-3">
            <View className="flex-row items-center justify-between">
              <AppText weight="medium" className="text-xs text-muted">
                {kind.label}
              </AppText>
              {fields.length > 1 ? (
                <AppText weight="medium" className="text-xs" onPress={() => remove(index)}>
                  Retirer
                </AppText>
              ) : null}
            </View>
            <Controller
              control={control}
              name={`accounts.${index}.name`}
              render={({ field: f }) => (
                <TextInput
                  accessibilityLabel="Nom du compte"
                  placeholder={kind.placeholder}
                  placeholderTextColor="#8A8D78"
                  value={f.value}
                  onChangeText={f.onChange}
                  className="h-11 rounded-xl bg-tile px-3 font-gs text-[15px] text-ink"
                />
              )}
            />
            {nameError ? <AppText className="text-xs text-danger">{nameError}</AppText> : null}
            <Controller
              control={control}
              name={`accounts.${index}.balance`}
              render={({ field: f }) => (
                <View className="h-11 flex-row items-center rounded-xl bg-tile px-3">
                  <TextInput
                    accessibilityLabel="Solde"
                    placeholder="Solde actuel"
                    placeholderTextColor="#8A8D78"
                    keyboardType="number-pad"
                    value={f.value}
                    onChangeText={(text) => {
                      const n = parseAmount(text);
                      f.onChange(n ? formatNumber(n) : '');
                    }}
                    className="flex-1 font-gs text-[15px] text-ink"
                  />
                  <AppText className="text-sm text-muted">Ar</AppText>
                </View>
              )}
            />
          </View>
        );
      })}
      {formState.errors.accounts?.root?.message ? (
        <AppText className="text-xs text-danger">{formState.errors.accounts.root.message}</AppText>
      ) : null}
    </OnboardingShell>
  );
}
