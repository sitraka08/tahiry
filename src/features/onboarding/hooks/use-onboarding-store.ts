import { create } from 'zustand';

import type { AccountDraft, OnboardingPrefs } from '../types';

type State = {
  accounts: AccountDraft[];
  prefs: OnboardingPrefs;
  setAccounts: (accounts: AccountDraft[]) => void;
  setPrefs: (prefs: OnboardingPrefs) => void;
};

export const useOnboardingStore = create<State>((set) => ({
  accounts: [],
  prefs: { goals: [], frequency: 'weekly', monthlyBudget: '' },
  setAccounts: (accounts) => set({ accounts }),
  setPrefs: (prefs) => set({ prefs }),
}));
