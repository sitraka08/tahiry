import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { formatTime } from '@/lib/dates';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import type { TransactionItem } from '../types';

type Props = { item: TransactionItem; onPress?: () => void; compact?: boolean };

export function TransactionRow({ item, onPress, compact = false }: Props) {
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
  const sign = isIn ? '+' : item.type === 'out' ? '−' : '';
  const title = item.note || item.categoryLabel || 'Transfert';
  const route = isTransfer ? `${item.accountName} → ${item.toAccountName}` : item.accountName;
  const meta = [route, isTransfer ? null : item.categoryLabel, formatTime(item.date)]
    .filter(Boolean)
    .join(' · ');
  const box = compact ? 'size-9 rounded-xl' : 'size-10 rounded-[13px]';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`flex-row items-center gap-3 border-b border-line active:opacity-70 ${compact ? 'py-2' : 'py-2.5'}`}
    >
      <View style={{ backgroundColor: tone.bg }} className={`items-center justify-center ${box}`}>
        <Icon size={18} color={tone.fg} strokeWidth={2} />
      </View>
      <View className="flex-1 gap-px">
        <AppText weight="medium" numberOfLines={1} className="text-[15px]">
          {title}
        </AppText>
        <AppText numberOfLines={1} className="text-xs text-muted">
          {meta}
        </AppText>
      </View>
      <AppText weight="bold" className="text-[15px]">
        {sign}
        {fmt(item.amount)}
      </AppText>
    </Pressable>
  );
}
