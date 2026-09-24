import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';

import { AppSheet, AppText, Button, Chip, type SheetMethods } from '@/components';
import { formatNumber, parseAmount } from '@/lib/money';
import { useThemeTokens } from '@/theme';

import { accountSchema, type AccountFormValues } from '../schemas/account-schema';
import type { AccountType, AccountWithBalance } from '../types';

const TYPES: { value: AccountType; label: string }[] = [
  { value: 'bank', label: 'Banque' },
  { value: 'mobile', label: 'Mobile Money' },
  { value: 'cash', label: 'Espèces' },
  { value: 'group', label: 'Épargne de groupe' },
];

type Props = {
  sheetRef: React.Ref<SheetMethods>;
  account: AccountWithBalance | null;
  onSubmit: (values: AccountFormValues) => void;
  onArchive: () => void;
};

function AccountForm({ account, onSubmit, onArchive }: Omit<Props, 'sheetRef'>) {
  const t = useThemeTokens();
  const { control, handleSubmit, formState } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      type: account?.type ?? 'bank',
      name: account?.name ?? '',
      detail: account?.detail ?? '',
      balance: account ? formatNumber(account.balance) : '',
    },
  });

  return (
    <View className="gap-3 pt-2">
      <AppText weight="bold" className="text-base">
        {account ? 'Modifier le compte' : 'Nouveau compte'}
      </AppText>

      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <View className="flex-row flex-wrap gap-1.5">
            {TYPES.map((o) => (
              <Chip
                key={o.value}
                label={o.label}
                selected={field.value === o.value}
                onPress={() => field.onChange(o.value)}
              />
            ))}
          </View>
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            accessibilityLabel="Nom du compte"
            placeholder="Nom du compte"
            placeholderTextColor={t.muted}
            value={field.value}
            onChangeText={field.onChange}
            className="h-12 rounded-[14px] bg-card px-3.5 py-0 font-gs text-[15px] text-ink"
          />
        )}
      />
      {formState.errors.name ? (
        <AppText className="-mt-1.5 text-xs text-danger">{formState.errors.name.message}</AppText>
      ) : null}

      <Controller
        control={control}
        name="detail"
        render={({ field }) => (
          <TextInput
            accessibilityLabel="Détail"
            placeholder="Détail (ex. Compte courant · ••4821)"
            placeholderTextColor={t.muted}
            value={field.value}
            onChangeText={field.onChange}
            className="h-12 rounded-[14px] bg-card px-3.5 py-0 font-gs text-[15px] text-ink"
          />
        )}
      />

      <Controller
        control={control}
        name="balance"
        render={({ field }) => (
          <View className="h-12 flex-row items-center rounded-[14px] bg-card px-3.5">
            <TextInput
              accessibilityLabel="Solde actuel"
              placeholder="Solde actuel"
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

      <Button
        label={account ? 'Enregistrer' : 'Ajouter le compte'}
        onPress={handleSubmit(onSubmit)}
      />
      {account ? (
        <Button label="Archiver ce compte" variant="soft" size="md" onPress={onArchive} />
      ) : null}
    </View>
  );
}

export function AccountSheet({ sheetRef, account, onSubmit, onArchive }: Props) {
  return (
    <AppSheet sheetRef={sheetRef}>
      <AccountForm
        key={account?.id ?? 'new'}
        account={account}
        onSubmit={onSubmit}
        onArchive={onArchive}
      />
    </AppSheet>
  );
}
