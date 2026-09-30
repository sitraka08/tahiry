import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { formatUpdated } from '@/lib/dates';
import { useAmountMask } from '@/lib/use-amount-mask';

import type { AccountWithBalance } from '../types';
import { AccountTypeIcon } from './account-type-icon';

const TYPE_LABEL = {
  bank: 'Compte bancaire',
  mobile: 'Mobile Money',
  cash: 'Espèces sur moi',
  group: 'Épargne de groupe',
} as const;

type Props = { account: AccountWithBalance; onPress: () => void };

export function AccountRow({ account, onPress }: Props) {
  const fmt = useAmountMask();
  const updated =
    account.type === 'cash'
      ? formatUpdated(account.countedAt, true)
      : formatUpdated(account.lastActivity);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Modifier ${account.name}`}
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-[18px] border border-line bg-card p-3 active:opacity-80"
    >
      <AccountTypeIcon type={account.type} size={42} />
      <View className="min-w-0 flex-1 gap-0.5">
        <AppText weight="bold" numberOfLines={1} className="text-[15px]">
          {account.name}
        </AppText>
        <AppText numberOfLines={1} className="text-xs text-muted">
          {account.detail || TYPE_LABEL[account.type]}
        </AppText>
      </View>
      <View className="items-end gap-0.5">
        <AppText weight="bold" className="text-[15px]">
          {fmt(account.balance)}
        </AppText>
        <AppText className="text-[11px] text-muted">{updated}</AppText>
      </View>
    </Pressable>
  );
}
