import { Pressable, View } from 'react-native';

import { AppText, ProgressBar } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';

import { percentOf } from '../hooks/goal-math';
import type { GoalItem } from '../types';

type Props = { goal: GoalItem; onPress: () => void };

export function GoalSummary({ goal, onPress }: Props) {
  const fmt = useAmountMask();
  const percent = percentOf(goal);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Objectif ${goal.name}, ${percent} %`}
      onPress={onPress}
      className="gap-2.5 rounded-card bg-card p-4 active:opacity-80"
    >
      <View className="flex-row items-baseline justify-between gap-2">
        <AppText weight="bold" numberOfLines={1} className="flex-1 text-body">
          Objectif : {goal.name}
        </AppText>
        <AppText weight="bold" className="text-caption">
          {percent} % · Voir tout
        </AppText>
      </View>
      <ProgressBar thick value={percent} trackClassName="bg-tile" />
      <AppText className="text-caption text-muted">
        {fmt(goal.saved)} sur {fmt(goal.target)}
        {goal.accountName ? ` · sur ${goal.accountName}` : ''}
      </AppText>
    </Pressable>
  );
}
