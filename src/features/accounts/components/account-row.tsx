import { View } from 'react-native';

import { AppText, IconTile, ListRow } from '@/components';
import { formatUpdated } from '@/lib/dates';
import { useAmountMask } from '@/lib/use-amount-mask';
import { accountVisual } from '@/lib/visuals';

import type { AccountWithBalance } from '../types';

const TYPE_LABEL = {
  bank: 'Compte bancaire',
  mobile: 'Mobile Money',
  cash: 'Espèces sur moi',
  group: 'Épargne de groupe',
} as const;

type Props = { account: AccountWithBalance; onPress: () => void };

export function AccountRow({ account, onPress }: Props) {
  const fmt = useAmountMask();
  const visual = accountVisual(account.type);
  const updated =
    account.type === 'cash'
      ? formatUpdated(account.countedAt, true)
      : formatUpdated(account.lastActivity);

  return (
    <ListRow
      leading={<IconTile icon={visual.icon} color={visual.color} />}
      title={account.name}
      subtitle={account.detail || TYPE_LABEL[account.type]}
      trailing={
        <View className="items-end gap-0.5">
          <AppText variant="body" weight="bold">
            {fmt(account.balance)}
          </AppText>
          <AppText variant="micro" tone="muted">
            {updated}
          </AppText>
        </View>
      }
      onPress={onPress}
      accessibilityLabel={`Modifier ${account.name}`}
    />
  );
}
