import { CalendarClock } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText, IconTile, TopoPattern } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import type { ReminderSummary } from '../types';

export function RemindersSummary({ summary }: { summary: ReminderSummary }) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const detail = [
    `${summary.count} paiement${summary.count > 1 ? 's' : ''}`,
    summary.lateCount > 0 ? `${summary.lateCount} en retard` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <View className="mx-4 mt-4 flex-row items-center justify-between gap-3 overflow-hidden rounded-card bg-card p-4">
      <TopoPattern color={t.ink} />
      <View className="flex-1 gap-0.5">
        <AppText variant="caption" tone="muted">
          À payer d’ici 30 jours
        </AppText>
        <AppText variant="title" numberOfLines={1} adjustsFontSizeToFit>
          {fmt(summary.total)}
        </AppText>
        <AppText
          variant="caption"
          tone={summary.lateCount > 0 ? 'danger' : 'muted'}
          numberOfLines={1}
        >
          {detail}
        </AppText>
      </View>
      <IconTile icon={CalendarClock} color="catTeal" />
    </View>
  );
}
