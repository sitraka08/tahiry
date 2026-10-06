import { View } from 'react-native';

import { AppText, ProgressBar } from '@/components';
import { formatNumber } from '@/lib/money';
import { useUiStore } from '@/lib/ui-store';

import type { BudgetLine as Line } from '../types';

export function BudgetLineRow({ line }: { line: Line }) {
  const hide = useUiStore((s) => s.hideAmounts);
  const show = (n: number) => (hide ? '••••' : formatNumber(n));

  return (
    <View className="gap-1.5 rounded-2xl border border-line bg-card px-3.5 py-3">
      <View className="flex-row justify-between gap-2">
        <AppText weight="medium" numberOfLines={1} className="flex-1 text-sm">
          {line.label}
        </AppText>
        <AppText className={`text-sm ${line.over ? 'text-danger' : ''}`}>
          <AppText weight="bold" className={line.over ? 'text-danger' : ''}>
            {show(line.spent)}
          </AppText>{' '}
          / {show(line.limit)}
        </AppText>
      </View>
      <ProgressBar value={line.percent} />
    </View>
  );
}
