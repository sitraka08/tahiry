import { Linking, View } from 'react-native';

import { AppText, PressableScale, ProgressBar } from '@/components';
import { formatShortDate } from '@/lib/dates';
import { formatNumber } from '@/lib/money';
import { useAmountMask } from '@/lib/use-amount-mask';

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
  tone: 'dark' | 'light' | 'accent';
  onPress: () => void;
}) {
  const box = { dark: 'bg-dark', light: 'bg-tile', accent: 'bg-accent' }[tone];
  const text = { dark: 'text-on-dark', light: 'text-ink', accent: 'text-on-accent' }[tone];
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className={`h-10 flex-1 items-center justify-center rounded-xl ${box}`}
    >
      <AppText weight={tone === 'accent' ? 'bold' : 'medium'} className={`text-[13px] ${text}`}>
        {label}
      </AppText>
    </PressableScale>
  );
}

function remind(debt: DebtItem) {
  const message = `Bonjour ${debt.person}, petit rappel pour les ${formatNumber(remainingOf(debt))} Ar que je t’ai prêtés. Merci !`;
  Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
}

export function DebtCard({ debt, onPay, onLongPress }: Props) {
  const fmt = useAmountMask();
  const borrowed = debt.direction === 'borrowed';
  const remaining = remainingOf(debt);
  const place = debt.accountName ? ` · ${debt.accountName}` : '';

  const muted = borrowed ? 'text-dark-muted' : 'text-muted';
  const sub = debt.settled
    ? 'remboursé'
    : debt.paid > 0
      ? `reste sur ${fmt(debt.amount, false)}`
      : debt.dueDate
        ? `${borrowed ? 'à rendre le' : 'promis le'} ${formatShortDate(debt.dueDate)}`
        : '';

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityHint="Appui long pour supprimer"
      onLongPress={() => onLongPress(debt)}
      scaleTo={0.99}
      className={`gap-2.5 rounded-[20px] p-3.5 ${borrowed ? 'bg-dark' : 'bg-card'} ${debt.settled ? 'opacity-60' : ''}`}
    >
      <View className="flex-row items-center gap-3">
        <View
          className={`size-10 items-center justify-center rounded-full ${borrowed ? 'bg-accent' : 'bg-tile'}`}
        >
          <AppText weight="bold" className={`text-sm ${borrowed ? 'text-on-accent' : ''}`}>
            {initialsOf(debt.person)}
          </AppText>
        </View>
        <View className="min-w-0 flex-1 gap-0.5">
          <AppText
            weight="bold"
            numberOfLines={1}
            className={`text-[15px] ${borrowed ? 'text-on-dark' : ''}`}
          >
            {debt.person}
            {borrowed ? ' · je dois' : ''}
          </AppText>
          <AppText numberOfLines={1} className={`text-xs ${muted}`}>
            {borrowed ? 'Emprunté' : 'Prêté'} le {formatShortDate(debt.date)}
            {place}
          </AppText>
        </View>
        <View className="items-end gap-0.5">
          <AppText weight="bold" className={`text-[15px] ${borrowed ? 'text-on-dark' : ''}`}>
            {fmt(debt.settled ? debt.amount : remaining)}
          </AppText>
          {sub ? <AppText className={`text-[11px] ${muted}`}>{sub}</AppText> : null}
        </View>
      </View>

      {debt.paid > 0 && !debt.settled ? <ProgressBar value={progressOf(debt)} /> : null}

      {debt.settled ? null : borrowed ? (
        <Action label="Rembourser maintenant" tone="accent" onPress={() => onPay(debt, true)} />
      ) : (
        <View className="flex-row gap-2">
          <Action label="Relancer par SMS" tone="dark" onPress={() => remind(debt)} />
          <Action
            label={debt.paid > 0 ? 'Ajouter un paiement' : 'Marquer remboursé'}
            tone="light"
            onPress={() => onPay(debt, debt.paid === 0)}
          />
        </View>
      )}
    </PressableScale>
  );
}
