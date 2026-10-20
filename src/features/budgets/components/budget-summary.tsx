import { View } from 'react-native';

import { AppText, ProgressRing, TopoPattern } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import type { BudgetView } from '../types';

export function BudgetSummary({ view }: { view: BudgetView }) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const over = view.remaining < 0;
  const color = over ? t.danger : t.catOrange;

  return (
    <View className="mx-4 mt-4 flex-row items-center gap-4 overflow-hidden rounded-card bg-card p-4">
      <TopoPattern color={t.ink} />
      <ProgressRing value={view.percent} color={color}>
        <AppText variant="body" weight="bold">
          {Math.round(view.percent)} %
        </AppText>
      </ProgressRing>
      <View className="flex-1 gap-0.5">
        <AppText variant="caption" tone="muted">
          {over ? 'Budget dépassé de' : 'Reste à dépenser'}
        </AppText>
        <AppText
          variant="title"
          numberOfLines={1}
          adjustsFontSizeToFit
          style={over ? { color: t.danger } : null}
        >
          {fmt(Math.abs(view.remaining))}
        </AppText>
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {fmt(view.spent, false)} sur {fmt(view.total, false)} · jour {view.day}/{view.days}
        </AppText>
        {!over ? (
          <AppText variant="caption" weight="bold" style={{ color }}>
            ≈ {fmt(view.perDay)} / jour
          </AppText>
        ) : null}
      </View>
    </View>
  );
}
