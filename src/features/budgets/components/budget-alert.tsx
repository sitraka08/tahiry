import { TriangleAlert } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText } from '@/components';
import { formatAmount } from '@/lib/money';
import { useThemeTokens } from '@/theme';

type Props = { monthLabel: string; alerts: { label: string; excess: number }[] };

export function BudgetAlert({ monthLabel, alerts }: Props) {
  const t = useThemeTokens();
  if (alerts.length === 0) return null;
  const first = alerts[0];
  const more = alerts.length - 1;

  return (
    <View className="mx-5 mt-3 flex-row items-center gap-2.5 rounded-2xl bg-accent px-3.5 py-3">
      <TriangleAlert size={20} color={t.onAccent} strokeWidth={1.8} />
      <AppText className="flex-1 text-[13px] leading-[18px] text-on-accent">
        En {monthLabel},{' '}
        <AppText weight="bold" className="text-on-accent">
          {first.label}
        </AppText>{' '}
        a dépassé son budget de {formatAmount(first.excess)}
        {more > 0 ? ` (+${more} autre${more > 1 ? 's' : ''})` : ''}.
      </AppText>
    </View>
  );
}
