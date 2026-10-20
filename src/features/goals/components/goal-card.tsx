import { View } from 'react-native';

import { AppText, Button, ProgressRing, TopoPattern } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import { dueLabel, monthlyNeeded, percentOf } from '../hooks/goal-math';
import type { GoalItem } from '../types';

type Props = { goal: GoalItem; now: number; onDeposit: (goal: GoalItem) => void };

export function GoalCard({ goal, now, onDeposit }: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const percent = percentOf(goal);
  const monthly = monthlyNeeded(goal, now);
  const due = dueLabel(goal.dueDate);

  return (
    <View className="gap-3.5 overflow-hidden rounded-card bg-card p-4">
      <TopoPattern color={t.ink} />
      <View className="flex-row items-center gap-4">
        <ProgressRing value={percent} color={t.catRose}>
          <AppText variant="body" weight="bold">
            {percent} %
          </AppText>
        </ProgressRing>
        <View className="flex-1 gap-0.5">
          <AppText variant="headline" numberOfLines={1}>
            {goal.name}
          </AppText>
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {fmt(goal.saved, false)} sur {fmt(goal.target)}
          </AppText>
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {due ? `D’ici ${due}` : 'Sans date limite'}
            {goal.accountName ? ` · ${goal.accountName}` : ''}
          </AppText>
        </View>
      </View>

      {monthly ? (
        <AppText variant="caption">
          Mets{' '}
          <AppText variant="caption" weight="bold" style={{ color: t.catRose }}>
            {fmt(monthly)} par mois
          </AppText>{' '}
          pour y arriver à temps.
        </AppText>
      ) : null}

      {percent < 100 ? (
        <Button
          label="Ajouter de l’argent"
          variant="soft"
          size="sm"
          onPress={() => onDeposit(goal)}
        />
      ) : (
        <AppText variant="body" weight="bold" tone="accent" className="text-center">
          Objectif atteint, bravo !
        </AppText>
      )}
    </View>
  );
}
