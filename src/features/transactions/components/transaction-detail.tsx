import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, Camera } from 'lucide-react-native';
import { Image, View } from 'react-native';

import { AppText, PressableScale } from '@/components';
import { formatLongDate } from '@/lib/dates';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import type { TransactionItem } from '../types';

type Props = {
  item: TransactionItem;
  balanceAfter: number;
  onPickReceipt: () => void;
};

const TYPE_LABEL = { out: 'Dépense', in: 'Revenu', transfer: 'Transfert' } as const;
const FROM_LABEL = { out: 'Payé avec', in: 'Reçu sur', transfer: 'Depuis' } as const;

function Row({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <View
      className={`min-h-12 flex-row items-center justify-between gap-4 ${last ? '' : 'border-b border-line'}`}
    >
      <AppText className="text-sm text-muted">{label}</AppText>
      <AppText weight="bold" className="flex-1 text-right text-sm">
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
  const Icon = isTransfer ? ArrowLeftRight : isIn ? ArrowDownLeft : ArrowUpRight;
  const tone = isIn
    ? { bg: t.accent, fg: t.onAccent }
    : isTransfer
      ? { bg: t.card, fg: t.ink }
      : { bg: t.dark, fg: t.onDark };
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
      <View className="mx-5 mt-6 items-center gap-2">
        <View
          style={{ backgroundColor: tone.bg }}
          className="size-[60px] items-center justify-center rounded-[20px]"
        >
          <Icon size={28} color={tone.fg} strokeWidth={2} />
        </View>
        <AppText weight="medium" className="mt-1.5 text-center text-xl">
          {item.note || item.categoryLabel || 'Transfert'}
        </AppText>
        <AppText
          weight="bold"
          className="text-[38px] leading-[44px]"
          style={{ letterSpacing: -0.8 }}
        >
          {sign}
          {fmt(item.amount, false)}{' '}
          <AppText weight="medium" className="text-xl">
            Ar
          </AppText>
        </AppText>
        <View className="rounded-full bg-accent px-3 py-[5px]">
          <AppText weight="bold" className="text-xs text-on-accent">
            {TYPE_LABEL[item.type]}
          </AppText>
        </View>
      </View>

      <View className="mx-5 mt-[22px] rounded-[20px] bg-card px-4 py-1">
        {rows.map((r) => (
          <Row
            key={r.label}
            label={r.label}
            value={r.value}
            last={!item.note && r === rows[rows.length - 1]}
          />
        ))}
        {item.note ? <Row label="Note" value={item.note} last /> : null}
      </View>

      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={
          item.receiptUri ? 'Changer la photo du reçu' : 'Ajouter une photo du reçu'
        }
        onPress={onPickReceipt}
        className="mx-5 mt-3 h-24 items-center justify-center gap-1.5 overflow-hidden rounded-[20px] border-[1.5px] border-dashed border-seg3"
      >
        {item.receiptUri ? (
          <Image source={{ uri: item.receiptUri }} resizeMode="cover" className="size-full" />
        ) : (
          <>
            <Camera size={22} color={t.ink} strokeWidth={1.8} />
            <AppText weight="medium" className="text-sm">
              Ajouter une photo du reçu
            </AppText>
          </>
        )}
      </PressableScale>
    </View>
  );
}
