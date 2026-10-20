import { View } from 'react-native';

import { AppText, PressableFeedback, ProgressRing, TopoPattern } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';
import { useThemeTokens } from '@/theme';

import { dueLabel, percentOf } from '../hooks/goal-math';
import type { GoalItem } from '../types';

type Props = { goal: GoalItem; onPress: () => void };

export function GoalHighlight({ goal, onPress }: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const percent = percentOf(goal);
  const due = dueLabel(goal.dueDate);
  const left = Math.max(goal.target - goal.saved, 0);

  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityLabel={`Objectif ${goal.name}, ${percent} %`}
      onPress={onPress}
      className="mx-4 mt-5 flex-row items-center gap-4 overflow-hidden rounded-card bg-card p-4"
    >
      <TopoPattern color={t.ink} />
      <View className="flex-1 gap-1">
        <AppText
          variant="micro"
          weight="bold"
          tone="muted"
          style={{ letterSpacing: 0.6 }}
          className="uppercase"
        >
          Objectif
        </AppText>
        <AppText variant="headline" numberOfLines={1}>
          {goal.name}
        </AppText>
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {fmt(goal.saved, false)} sur {fmt(goal.target)}
        </AppText>
        <AppText variant="caption" numberOfLines={1} style={{ color: t.catRose }} className="mt-1">
          Encore {fmt(left)}
          {due ? ` · d’ici ${due}` : ''}
        </AppText>
      </View>
      <ProgressRing value={percent} color={t.catRose}>
        <AppText variant="body" weight="bold">
          {percent} %
        </AppText>
      </ProgressRing>
    </PressableFeedback>
  );
}
