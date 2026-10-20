import { Linking, View } from 'react-native';

import { AppText, PressableFeedback, ProgressBar } from '@/components';
import { withAlpha } from '@/lib/color';
import { formatShortDate } from '@/lib/dates';
import { formatNumber } from '@/lib/money';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import { initialsOf, progressOf, remainingOf } from '../hooks/debt-math';
import type { DebtItem } from '../types';

type Props = {
  debt: DebtItem;
  onPay: (debt: DebtItem, full: boolean) => void;
  onLongPress: (debt: DebtItem) => void;
};

function Action({
  label,
  tone,
  onPress,
}: {
  label: string;
  tone: 'light' | 'accent';
  onPress: () => void;
}) {
  const box = { light: 'bg-tile', accent: 'bg-accent' }[tone];
  const text = { light: 'text-ink', accent: 'text-on-accent' }[tone];
  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className={`h-11 flex-1 items-center justify-center rounded-full ${box}`}
    >
      <AppText weight={tone === 'accent' ? 'bold' : 'medium'} className={`text-caption ${text}`}>
        {label}
      </AppText>
    </PressableFeedback>
  );
}

function remind(debt: DebtItem) {
  const message = `Bonjour ${debt.person}, petit rappel pour les ${formatNumber(remainingOf(debt))} Ar que je t’ai prêtés. Merci !`;
  Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
}

export function DebtCard({ debt, onPay, onLongPress }: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const borrowed = debt.direction === 'borrowed';
  const remaining = remainingOf(debt);
  const place = debt.accountName ? ` · ${debt.accountName}` : '';

  const tint = borrowed ? t.catViolet : t.catTeal;
  const sub = debt.settled
    ? 'remboursé'
    : debt.paid > 0
      ? `reste sur ${fmt(debt.amount, false)}`
      : debt.dueDate
        ? `${borrowed ? 'à rendre le' : 'promis le'} ${formatShortDate(debt.dueDate)}`
        : '';

  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityHint="Appui long pour supprimer"
      onLongPress={() => onLongPress(debt)}
      className={`gap-3 rounded-card bg-card p-4 ${debt.settled ? 'opacity-60' : ''}`}
    >
      <View className="flex-row items-center gap-3">
        <View
          style={{ backgroundColor: withAlpha(tint, 0.16) }}
          className="size-11 items-center justify-center rounded-full"
        >
          <AppText weight="bold" style={{ color: tint }} className="text-sm">
            {initialsOf(debt.person)}
          </AppText>
        </View>
        <View className="min-w-0 flex-1 gap-0.5">
          <AppText variant="body" weight="bold" numberOfLines={1}>
            {debt.person}
            {borrowed ? ' · je dois' : ''}
          </AppText>
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {borrowed ? 'Emprunté' : 'Prêté'} le {formatShortDate(debt.date)}
            {place}
          </AppText>
        </View>
        <View className="items-end gap-0.5">
          <AppText variant="body" weight="bold">
            {fmt(debt.settled ? debt.amount : remaining)}
          </AppText>
          {sub ? (
            <AppText variant="micro" tone="muted">
              {sub}
            </AppText>
          ) : null}
        </View>
      </View>

      {debt.paid > 0 && !debt.settled ? <ProgressBar value={progressOf(debt)} /> : null}

      {debt.settled ? null : borrowed ? (
        <Action label="Rembourser maintenant" tone="accent" onPress={() => onPay(debt, true)} />
      ) : (
        <View className="flex-row gap-2">
          <Action label="Relancer par SMS" tone="light" onPress={() => remind(debt)} />
          <Action
            label={debt.paid > 0 ? 'Ajouter un paiement' : 'Marquer remboursé'}
            tone="light"
            onPress={() => onPay(debt, debt.paid === 0)}
          />
        </View>
      )}
    </PressableFeedback>
  );
}
