import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';

import { dueStatus } from '../hooks/reminder-math';
import type { ReminderItem, Tone } from '../types';

const BLOCK: Record<Tone, { box: string; text: string }> = {
  late: { box: 'bg-dark', text: 'text-accent' },
  soon: { box: 'bg-accent', text: 'text-on-accent' },
  later: { box: 'bg-card', text: 'text-ink' },
};

const PILL: Record<Tone, string> = {
  late: 'bg-dark',
  soon: 'bg-accent',
  later: 'bg-card',
};

const PILL_TEXT: Record<Tone, string> = {
  late: 'text-accent',
  soon: 'text-on-accent',
  later: 'text-ink',
};

type Props = { item: ReminderItem; now: number; onPress: (item: ReminderItem) => void };

export function ReminderRow({ item, now, onPress }: Props) {
  const fmt = useAmountMask();
  const { label, tone } = dueStatus(item.dueDate, now);
  const subtitle = [item.accountName, item.amount ? fmt(item.amount) : null]
    .filter(Boolean)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(item)}
      className="flex-row items-center gap-3 py-2 active:opacity-70"
    >
      <View className={`h-12 w-[46px] items-center justify-center rounded-xl ${BLOCK[tone].box}`}>
        <AppText weight="bold" className={`text-lg leading-[18px] ${BLOCK[tone].text}`}>
          {format(item.dueDate, 'd')}
        </AppText>
        <AppText className={`mt-0.5 text-micro leading-[11px] ${BLOCK[tone].text}`}>
          {format(item.dueDate, 'MMM', { locale: fr })}
        </AppText>
      </View>
      <View className="min-w-0 flex-1 gap-0.5">
        <AppText weight="medium" numberOfLines={1} className="text-body">
          {item.title}
        </AppText>
        {subtitle ? (
          <AppText numberOfLines={1} className="text-xs text-muted">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      <View className={`rounded-full px-2.5 py-[5px] ${PILL[tone]}`}>
        <AppText
          weight={tone === 'later' ? 'medium' : 'bold'}
          className={`text-xs ${PILL_TEXT[tone]}`}
        >
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}
