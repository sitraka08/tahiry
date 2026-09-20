import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { AppText, Chip } from '@/components';
import { formatNumber, parseAmount } from '@/lib/money';

import type { Frequency, Goal, OnboardingPrefs } from '../types';
import { OnboardingShell } from './onboarding-shell';

const GOALS: { value: Goal; label: string }[] = [
  { value: 'track', label: 'Suivre mes dépenses' },
  { value: 'save', label: 'Épargner' },
  { value: 'budget', label: 'Tenir un budget' },
  { value: 'debts', label: 'Suivre mes dettes' },
];

const FREQUENCIES: { value: Frequency; label: string }[] = [
  { value: 'weekly', label: 'Chaque semaine' },
  { value: 'monthly', label: 'Chaque mois' },
  { value: 'never', label: 'Jamais' },
];

type Props = {
  initial: OnboardingPrefs;
  onSubmit: (prefs: OnboardingPrefs) => void;
  onSkip: () => void;
};

export function PrioritiesStep({ initial, onSubmit, onSkip }: Props) {
  const [prefs, setPrefs] = useState(initial);

  const toggle = (goal: Goal) =>
    setPrefs((p) => ({
      ...p,
      goals: p.goals.includes(goal) ? p.goals.filter((g) => g !== goal) : [...p.goals, goal],
    }));

  return (
    <OnboardingShell
      step={1}
      title="Qu’est-ce qui compte pour toi ?"
      subtitle="Plusieurs choix possibles."
      actionLabel="Continuer"
      onAction={() => onSubmit(prefs)}
      onSkip={onSkip}
    >
      <View className="flex-row flex-wrap gap-2">
        {GOALS.map((g) => (
          <Chip
            key={g.value}
            label={g.label}
            selected={prefs.goals.includes(g.value)}
            onPress={() => toggle(g.value)}
          />
        ))}
      </View>

      <AppText weight="bold" className="mt-2 text-base">
        Un petit bilan, tu le veux quand ?
      </AppText>
      <View className="flex-row flex-wrap gap-2">
        {FREQUENCIES.map((f) => (
          <Chip
            key={f.value}
            label={f.label}
            selected={prefs.frequency === f.value}
            onPress={() => setPrefs((p) => ({ ...p, frequency: f.value }))}
          />
        ))}
      </View>

      <AppText weight="bold" className="mt-2 text-base">
        Budget mensuel (facultatif)
      </AppText>
      <View className="h-12 flex-row items-center rounded-[14px] bg-card px-3.5">
        <TextInput
          accessibilityLabel="Budget mensuel"
          placeholder="0"
          placeholderTextColor="#8A8D78"
          keyboardType="number-pad"
          value={prefs.monthlyBudget}
          onChangeText={(text) => {
            const n = parseAmount(text);
            setPrefs((p) => ({ ...p, monthlyBudget: n ? formatNumber(n) : '' }));
          }}
          className="flex-1 font-gs text-base text-ink"
        />
        <AppText className="text-sm text-muted">Ar</AppText>
      </View>
    </OnboardingShell>
  );
}
