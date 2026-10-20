import { Camera } from 'lucide-react-native';
import { Image, View } from 'react-native';

import { AppText, PressableFeedback } from '@/components';
import { withAlpha } from '@/lib/color';
import { formatLongDate } from '@/lib/dates';
import { useAmountMask } from '@/lib/use-amount-mask';
import { TRANSFER_VISUAL, categoryVisual } from '@/lib/visuals';
import { useThemeTokens } from '@/theme';

import type { TransactionItem } from '../types';

type Props = {
  item: TransactionItem;
  balanceAfter: number;
  onPickReceipt: () => void;
};

const TYPE_LABEL = { out: 'Dépense', in: 'Revenu', transfer: 'Transfert' } as const;
const FROM_LABEL = { out: 'Payé avec', in: 'Reçu sur', transfer: 'Depuis' } as const;

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="min-h-12 flex-row items-center justify-between gap-4">
      <AppText variant="caption" tone="muted">
        {label}
      </AppText>
      <AppText variant="body" weight="medium" className="flex-1 text-right">
        {value}
      </AppText>
    </View>
  );
}

export function TransactionDetail({ item, balanceAfter, onPickReceipt }: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const isIn = item.type === 'in';
  const isTransfer = item.type === 'transfer';
  const visual = isTransfer
    ? TRANSFER_VISUAL
    : categoryVisual(isIn ? 'in' : 'out', item.categoryKey);
  const color = t[visual.color];
  const Icon = visual.icon;
  const sign = isIn ? '+' : isTransfer ? '' : '−';
  const date = formatLongDate(item.date);
  const rows: { label: string; value: string }[] = [
    { label: FROM_LABEL[item.type], value: item.accountName },
    ...(isTransfer && item.toAccountName ? [{ label: 'Vers', value: item.toAccountName }] : []),
    ...(item.categoryLabel ? [{ label: 'Motif', value: item.categoryLabel }] : []),
    { label: 'Date', value: date.charAt(0).toUpperCase() + date.slice(1) },
    { label: `Solde ${item.accountName} après`, value: fmt(balanceAfter) },
  ];

  return (
    <View>
      <View className="mx-4 mt-6 items-center gap-2">
        <View
          style={{ backgroundColor: withAlpha(color, 0.15) }}
          className="size-16 items-center justify-center rounded-card"
        >
          <Icon size={28} color={color} strokeWidth={1.9} />
        </View>
        <AppText variant="title" weight="medium" className="mt-1.5 text-center">
          {item.note || item.categoryLabel || 'Transfert'}
        </AppText>
        <AppText weight="bold" tone={isIn ? 'accent' : 'ink'} className="text-hero">
          {sign}
          {fmt(item.amount, false)}{' '}
          <AppText weight="medium" tone="muted" className="text-xl">
            Ar
          </AppText>
        </AppText>
        <View
          style={{ backgroundColor: withAlpha(color, 0.15) }}
          className="rounded-full px-3 py-1"
        >
          <AppText weight="bold" style={{ color }} className="text-xs">
            {TYPE_LABEL[item.type]}
          </AppText>
        </View>
      </View>

      <View className="mx-4 mt-6 rounded-card bg-card px-4 py-1">
        {rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.value} />
        ))}
        {item.note ? <Row label="Note" value={item.note} /> : null}
      </View>

      <PressableFeedback
        accessibilityRole="button"
        accessibilityLabel={
          item.receiptUri ? 'Changer la photo du reçu' : 'Ajouter une photo du reçu'
        }
        onPress={onPickReceipt}
        className="mx-4 mt-3 h-24 items-center justify-center gap-1.5 overflow-hidden rounded-card border-[1.5px] border-dashed border-outline"
      >
        {item.receiptUri ? (
          <Image source={{ uri: item.receiptUri }} resizeMode="cover" className="size-full" />
        ) : (
          <>
            <Camera size={22} color={t.ink} strokeWidth={1.8} />
            <AppText variant="caption" weight="medium">
              Ajouter une photo du reçu
            </AppText>
          </>
        )}
      </PressableFeedback>
    </View>
  );
}
