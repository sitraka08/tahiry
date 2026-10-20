import { PiggyBank, Target } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText, Button, ProgressBar } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import { dueLabel, monthlyNeeded, percentOf } from '../hooks/goal-math';
import type { GoalItem } from '../types';

type Props = {
  goal: GoalItem;
  dark: boolean;
  now: number;
  onDeposit: (goal: GoalItem) => void;
};

export function GoalCard({ goal, dark, now, onDeposit }: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const percent = percentOf(goal);
  const monthly = monthlyNeeded(goal, now);
  const due = dueLabel(goal.dueDate);
  const Icon = dark ? PiggyBank : Target;

  const text = dark ? 'text-on-dark' : 'text-ink';
  const muted = dark ? 'text-dark-muted' : 'text-muted';

  return (
    <View className={`gap-3 rounded-card p-4 ${dark ? 'bg-dark' : 'bg-card'}`}>
      <View className="flex-row items-center gap-3">
        <View
          className={`size-11 items-center justify-center rounded-tile ${dark ? 'bg-accent' : 'bg-tile'}`}
        >
          <Icon size={22} color={dark ? t.onAccent : t.ink} strokeWidth={1.8} />
        </View>
        <View className="flex-1 gap-0.5">
          <AppText weight="bold" numberOfLines={1} className={`text-base ${text}`}>
            {goal.name}
          </AppText>
          <AppText className={`text-xs ${muted}`}>
            {due ? `Objectif : ${due}` : 'Sans date limite'}
          </AppText>
        </View>
        <AppText weight="bold" className={`text-xl ${dark ? 'text-accent' : 'text-ink'}`}>
          {percent} %
        </AppText>
      </View>

      <ProgressBar
        thick
        value={percent}
        tone={dark ? 'accent' : 'ink'}
        trackClassName={dark ? 'bg-white/15' : 'bg-tile'}
      />

      <View className="flex-row justify-between">
        <AppText className={`text-caption ${text}`}>{fmt(goal.saved)}</AppText>
        <AppText className={`text-caption ${muted}`}>sur {fmt(goal.target)}</AppText>
      </View>

      {monthly ? (
        <View className={`rounded-xl px-3 py-2.5 ${dark ? 'bg-white/10' : 'bg-tile'}`}>
          <AppText className={`text-caption leading-[18px] ${text}`}>
            Mets{' '}
            <AppText weight="bold" className={dark ? 'text-accent' : 'text-ink'}>
              {fmt(monthly)} par mois
            </AppText>{' '}
            pour y arriver à temps.
          </AppText>
        </View>
      ) : null}

      {percent < 100 ? (
        <Button
          label="Ajouter de l’argent"
          variant={dark ? 'accent' : 'primary'}
          size="sm"
          onPress={() => onDeposit(goal)}
        />
      ) : (
        <AppText
          weight="bold"
          className={`text-center text-sm ${dark ? 'text-accent' : 'text-ink'}`}
        >
          Objectif atteint, bravo !
        </AppText>
      )}
    </View>
  );
}
