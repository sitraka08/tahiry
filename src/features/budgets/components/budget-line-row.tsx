import { View } from 'react-native';

import { AppText, ProgressBar } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import type { BudgetLine as Line } from '../types';

export function BudgetLineRow({ line }: { line: Line }) {
  const t = useThemeTokens();
  const fmt = useAmountMask();

  return (
    <View className="gap-2 px-4 py-3">
      <View className="flex-row justify-between gap-2">
        <AppText variant="body" weight="medium" numberOfLines={1} className="flex-1">
          {line.label}
        </AppText>
        <AppText variant="caption" tone={line.over ? 'danger' : 'muted'}>
          <AppText variant="caption" weight="bold" tone={line.over ? 'danger' : 'ink'}>
            {fmt(line.spent, false)}
          </AppText>{' '}
          / {fmt(line.limit, false)}
        </AppText>
      </View>
      <ProgressBar value={line.percent} color={line.over ? t.danger : t.catOrange} />
    </View>
  );
}
