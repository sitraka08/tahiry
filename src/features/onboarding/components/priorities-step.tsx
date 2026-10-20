import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppText, Button, Headline, MoneyField, Segmented } from '@/components';
import { useThemeTokens } from '@/theme';

import type { Frequency, Goal, OnboardingPrefs } from '../types';
import { OnboardingShell } from './onboarding-shell';
import { OptionCard } from './option-card';

const GOALS: { value: Goal; label: string }[] = [
  { value: 'where', label: 'Savoir où part mon argent' },
  { value: 'bills', label: 'Ne plus oublier mes factures' },
  { value: 'save', label: 'Épargner pour un objectif' },
  { value: 'debts', label: 'Suivre l’argent prêté ou emprunté' },
  { value: 'budget', label: 'Tenir un budget chaque mois' },
];

const FREQUENCIES: { value: Frequency; label: string }[] = [
  { value: 'day', label: 'Chaque soir' },
  { value: 'week', label: 'Le dimanche' },
  { value: 'never', label: 'Jamais' },
];

type Props = {
  initial: OnboardingPrefs;
  onSubmit: (prefs: OnboardingPrefs) => void;
  onSkip: () => void;
  onBack: () => void;
};

export function PrioritiesStep({ initial, onSubmit, onSkip, onBack }: Props) {
  const t = useThemeTokens();
  const [prefs, setPrefs] = useState(initial);

  const toggle = (goal: Goal) =>
    setPrefs((p) => ({
      ...p,
      goals: p.goals.includes(goal) ? p.goals.filter((g) => g !== goal) : [...p.goals, goal],
    }));

  return (
    <OnboardingShell
      step={2}
      onBack={onBack}
      headerRight={{ kind: 'skip', onPress: onSkip }}
      title={<Headline lead="Qu’est-ce qui compte " highlight="pour toi" tail=" ?" />}
      subtitle="Plusieurs choix possibles. On adapte ton accueil."
      footer={
        <Button
          label="Continuer"
          icon={<ArrowRight size={20} color={t.onInverse} strokeWidth={2} />}
          onPress={() => onSubmit(prefs)}
        />
      }
    >
      <View className="mt-4 gap-1.5">
        {GOALS.map((g, i) => (
          <Animated.View key={g.value} entering={FadeInDown.delay(120 + i * 50).duration(300)}>
            <OptionCard
              variant="goal"
              label={g.label}
              selected={prefs.goals.includes(g.value)}
              onPress={() => toggle(g.value)}
            />
          </Animated.View>
        ))}
      </View>

      <AppText weight="bold" className="mt-[22px] text-headline">
        Un petit bilan, tu le veux quand ?
      </AppText>
      <View className="mt-2.5">
        <Segmented
          options={FREQUENCIES}
          value={prefs.frequency}
          onChange={(frequency) => setPrefs((p) => ({ ...p, frequency }))}
        />
      </View>

      <AppText weight="bold" className="mt-5 text-body">
        Budget mensuel <AppText className="text-muted">(facultatif)</AppText>
      </AppText>
      <MoneyField
        className="mt-2"
        accessibilityLabel="Budget mensuel"
        placeholder="Ex. 600 000"
        value={prefs.monthlyBudget}
        onChangeValue={(monthlyBudget) => setPrefs((p) => ({ ...p, monthlyBudget }))}
      />
    </OnboardingShell>
  );
}
