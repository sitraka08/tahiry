import { TriangleAlert } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText } from '@/components';
import { withAlpha } from '@/lib/color';
import { formatAmount } from '@/lib/money';
import { useThemeTokens } from '@/theme';

type Props = { monthLabel: string; alerts: { label: string; excess: number }[] };

export function BudgetAlert({ monthLabel, alerts }: Props) {
  const t = useThemeTokens();
  if (alerts.length === 0) return null;
  const first = alerts[0];
  const more = alerts.length - 1;

  return (
    <View
      style={{ backgroundColor: withAlpha(t.danger, 0.12) }}
      className="mx-4 mt-3 flex-row items-center gap-3 rounded-card px-4 py-3"
    >
      <TriangleAlert size={20} color={t.danger} strokeWidth={1.8} />
      <AppText variant="caption" className="flex-1">
        En {monthLabel},{' '}
        <AppText variant="caption" weight="bold">
          {first.label}
        </AppText>{' '}
        a dépassé son budget de {formatAmount(first.excess)}
        {more > 0 ? ` (+${more} autre${more > 1 ? 's' : ''})` : ''}.
      </AppText>
    </View>
  );
}
