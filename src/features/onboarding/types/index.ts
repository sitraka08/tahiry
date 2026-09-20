export type AccountDraft = { type: 'bank' | 'mobile' | 'cash'; name: string; balance: string };

export type Goal = 'track' | 'save' | 'budget' | 'debts';
export type Frequency = 'weekly' | 'monthly' | 'never';

export type OnboardingPrefs = {
  goals: Goal[];
  frequency: Frequency;
  monthlyBudget: string;
};
