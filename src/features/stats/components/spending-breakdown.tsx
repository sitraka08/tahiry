import { View } from 'react-native';

import { AppText, ProgressBar } from '@/components';
import { formatAmount } from '@/lib/money';
import { useUiStore } from '@/lib/ui-store';
import { useThemeTokens } from '@/theme';

import type { CategoryShare } from '../types';

export function SpendingBreakdown({ categories }: { categories: CategoryShare[] }) {
  const t = useThemeTokens();
  const hide = useUiStore((s) => s.hideAmounts);

  return (
    <View className="mx-4 mt-6">
      <AppText accessibilityRole="header" variant="headline">
        Où part l’argent
      </AppText>
      {categories.length === 0 ? (
        <View className="mt-2.5 items-center rounded-card border border-dashed border-outline px-4 py-6">
          <AppText className="text-center text-sm text-muted">
            Aucune dépense sur cette période.
          </AppText>
        </View>
      ) : (
        <View className="mt-2.5 gap-2.5">
          {categories.map((c) => (
            <View key={c.label} className="gap-1.5">
              <View className="flex-row items-baseline justify-between gap-2">
                <AppText numberOfLines={1} className="flex-1 text-sm">
                  {c.label}
                </AppText>
                <AppText weight="bold" className="text-sm">
                  {hide ? '••••••' : formatAmount(c.total)} · {c.percent} %
                </AppText>
              </View>
              <ProgressBar value={c.share * 100} color={t.catOrange} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
