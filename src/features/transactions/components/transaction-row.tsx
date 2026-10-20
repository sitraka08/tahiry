import { AppText, IconTile, ListRow } from '@/components';
import { formatTime } from '@/lib/dates';
import { useAmountMask } from '@/lib/use-amount-mask';
import { TRANSFER_VISUAL, categoryVisual } from '@/lib/visuals';

import type { TransactionItem } from '../types';

type Props = { item: TransactionItem; onPress?: () => void; showTime?: boolean };

export function TransactionRow({ item, onPress, showTime = false }: Props) {
  const fmt = useAmountMask();
  const isTransfer = item.type === 'transfer';
  const visual = isTransfer
    ? TRANSFER_VISUAL
    : categoryVisual(item.type === 'in' ? 'in' : 'out', item.categoryKey);
  const sign = item.type === 'in' ? '+' : item.type === 'out' ? '−' : '';
  const tone = item.type === 'in' ? 'accent' : isTransfer ? 'muted' : 'ink';
  const title = isTransfer
    ? item.note || `${item.accountName} → ${item.toAccountName}`
    : item.note || item.categoryLabel || 'Opération';
  const subtitle = [
    isTransfer ? 'Transfert' : item.note ? item.categoryLabel : null,
    isTransfer ? null : item.accountName,
    showTime ? formatTime(item.date) : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <ListRow
      leading={<IconTile icon={visual.icon} color={visual.color} />}
      title={title}
      subtitle={subtitle}
      trailing={
        <AppText variant="body" weight="bold" tone={tone}>
          {sign}
          {fmt(item.amount, false)}
        </AppText>
      }
      onPress={onPress}
      accessibilityLabel={`${title}, ${sign}${fmt(item.amount)}`}
    />
  );
}
