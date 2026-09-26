import { CalendarClock } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText } from '@/components';
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
    <View className="mx-5 mt-3.5 flex-row items-center justify-between gap-3 rounded-[22px] bg-dark px-5 py-[18px]">
      <View className="gap-1">
        <AppText className="text-[13px] text-dark-muted">À payer d’ici 30 jours</AppText>
        <AppText weight="bold" className="text-[30px] text-on-dark" style={{ letterSpacing: -0.5 }}>
          {fmt(summary.total, false)}{' '}
          <AppText weight="medium" className="text-base text-on-dark">
            Ar
          </AppText>
        </AppText>
        <AppText className="text-xs text-dark-muted">{detail}</AppText>
      </View>
      <View
        style={{ transform: [{ rotate: '-6deg' }] }}
        className="size-14 items-center justify-center rounded-[18px] bg-accent"
      >
        <CalendarClock size={28} color={t.onAccent} strokeWidth={1.8} />
      </View>
    </View>
  );
}
