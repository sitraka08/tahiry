import { create } from 'zustand';

import type { AccountDraft, OnboardingPrefs } from '../types';

type State = {
  accounts: AccountDraft[];
  prefs: OnboardingPrefs;
  setAccounts: (accounts: AccountDraft[]) => void;
  setPrefs: (prefs: OnboardingPrefs) => void;
};

export const useOnboardingStore = create<State>((set) => ({
  accounts: [
    { type: 'bank', name: 'Banque', balance: '' },
    { type: 'mobile', name: 'Mobile Money', balance: '' },
    { type: 'cash', name: 'Portefeuille', balance: '' },
  ],
  prefs: { goals: ['where', 'bills'], frequency: 'week', monthlyBudget: '' },
  setAccounts: (accounts) => set({ accounts }),
  setPrefs: (prefs) => set({ prefs }),
}));
