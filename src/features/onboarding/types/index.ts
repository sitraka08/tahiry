export type AccountKind = 'bank' | 'mobile' | 'cash' | 'group';

export type AccountDraft = { type: AccountKind; name: string; balance: string };

export type Goal = 'where' | 'bills' | 'save' | 'debts' | 'budget';
export type Frequency = 'day' | 'week' | 'never';

export type OnboardingPrefs = {
  goals: Goal[];
  frequency: Frequency;
  monthlyBudget: string;
};
