import { Pressable } from 'react-native';

import { AppText } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';

import type { AccountWithBalance } from '../types';
import { AccountTypeIcon } from './account-type-icon';

type Props = { account: AccountWithBalance; onPress?: () => void };

export function AccountChip({ account, onPress }: Props) {
  const fmt = useAmountMask();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="w-[124px] gap-1.5 rounded-[18px] border border-line bg-card p-3 active:opacity-80"
    >
      <AccountTypeIcon type={account.type} />
      <AppText numberOfLines={1} className="mt-0.5 text-xs text-muted">
        {account.name}
      </AppText>
      <AppText weight="bold" className="text-[15px]">
        {fmt(account.balance)}
      </AppText>
    </Pressable>
  );
}
