import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { formatTime } from '@/lib/dates';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import type { TransactionItem } from '../types';

type Props = { item: TransactionItem; onPress?: () => void };

export function TransactionRow({ item, onPress }: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const isIn = item.type === 'in';
  const Icon = item.type === 'transfer' ? ArrowLeftRight : isIn ? ArrowDownLeft : ArrowUpRight;
  const bg = isIn ? t.accent : t.dark;
  const fg = isIn ? t.onAccent : t.onDark;
  const sign = isIn ? '+' : item.type === 'out' ? '−' : '';
  const title = item.note || item.categoryLabel || 'Transfert';
  const meta = [item.accountName, item.categoryLabel, formatTime(item.date)]
    .filter(Boolean)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="flex-row items-center gap-3 border-b border-line py-2.5 active:opacity-70"
    >
      <View
        style={{ backgroundColor: bg }}
        className="size-10 items-center justify-center rounded-[13px]"
      >
        <Icon size={18} color={fg} strokeWidth={2} />
      </View>
      <View className="flex-1 gap-0.5">
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
