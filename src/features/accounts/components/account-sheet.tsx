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
import { formatNumber } from '@/lib/money';

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
          <TextField
            label="Nom du compte"
            placeholder="Ex. Banque, Mvola, Portefeuille"
            value={field.value}
            onChangeText={field.onChange}
            error={formState.errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="detail"
        render={({ field }) => (
          <TextField
            label="Détail (facultatif)"
            placeholder="Ex. Compte courant · ••4821"
            value={field.value ?? ''}
            onChangeText={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="balance"
        render={({ field }) => (
          <MoneyField label="Solde actuel" value={field.value} onChangeValue={field.onChange} />
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
