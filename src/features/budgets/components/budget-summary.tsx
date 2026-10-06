import { View } from 'react-native';

import { AppText, ProgressBar } from '@/components';
import { formatAmount, formatNumber } from '@/lib/money';
import { useUiStore } from '@/lib/ui-store';

import type { BudgetView } from '../types';

export function BudgetSummary({ view }: { view: BudgetView }) {
  const hide = useUiStore((s) => s.hideAmounts);
  const money = (n: number) => (hide ? '••••••' : formatAmount(n));
  const over = view.remaining < 0;

  return (
    <View className="mx-5 mt-4 gap-3 rounded-[22px] bg-dark px-5 py-[18px]">
      <View className="flex-row items-baseline justify-between">
        <AppText className="text-[13px] text-dark-muted">
          {over ? 'Budget dépassé de' : 'Reste à dépenser'}
        </AppText>
        <AppText className="text-xs text-dark-muted">
          Jour {view.day} sur {view.days}
        </AppText>
      </View>
      <AppText
        weight="bold"
        className="text-[34px] leading-[38px] text-on-dark"
        style={{ letterSpacing: -0.6 }}
      >
        {hide ? '••••••' : formatNumber(Math.abs(view.remaining))}{' '}
        <AppText weight="medium" className="text-lg text-on-dark">
          Ar
        </AppText>
      </AppText>
      <ProgressBar thick value={view.percent} tone="accent" trackClassName="bg-white/15" />
      <View className="flex-row justify-between gap-2">
        <AppText className="flex-1 text-xs text-dark-muted">
          Dépensé {hide ? '••••' : formatNumber(view.spent)} sur{' '}
          {hide ? '••••' : formatNumber(view.total)}
        </AppText>
        {!over ? (
          <AppText weight="bold" className="text-xs text-accent">
            ≈ {money(view.perDay)} / jour
          </AppText>
        ) : null}
      </View>
    </View>
  );
}
