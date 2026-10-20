import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { withAlpha } from '@/lib/color';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import { dueStatus } from '../hooks/reminder-math';
import type { ReminderItem, Tone } from '../types';

type Props = { item: ReminderItem; now: number; onPress: (item: ReminderItem) => void };

export function ReminderRow({ item, now, onPress }: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const { label, tone } = dueStatus(item.dueDate, now);
  const color: Record<Tone, string> = { late: t.danger, soon: t.catOrange, later: t.muted };
  const c = color[tone];
  const subtitle = [item.accountName, item.amount ? fmt(item.amount) : null]
    .filter(Boolean)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, ${label}`}
      onPress={() => onPress(item)}
      className="min-h-16 flex-row items-center gap-3 px-4 py-2 active:bg-tile"
    >
      <View
        style={{ backgroundColor: tone === 'later' ? t.tile : withAlpha(c, 0.15) }}
        className="size-11 items-center justify-center rounded-tile"
      >
        <AppText
          weight="bold"
          style={{ color: tone === 'later' ? t.ink : c }}
          className="text-base"
        >
          {format(item.dueDate, 'd')}
        </AppText>
        <AppText
          variant="micro"
          style={{ color: tone === 'later' ? t.muted : c }}
          className="-mt-1"
        >
          {format(item.dueDate, 'MMM', { locale: fr })}
        </AppText>
      </View>
      <View className="min-w-0 flex-1 gap-0.5">
        <AppText variant="body" weight="medium" numberOfLines={1}>
          {item.title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      <AppText variant="caption" weight={tone === 'later' ? 'medium' : 'bold'} style={{ color: c }}>
        {label}
      </AppText>
    </Pressable>
  );
}
