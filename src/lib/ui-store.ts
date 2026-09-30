import { create } from 'zustand';

import { setSetting } from '@/db';

type UiState = {
  hideAmounts: boolean;
  setHideAmounts: (value: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  hideAmounts: false,
  setHideAmounts: (hideAmounts) => {
    set({ hideAmounts });
    setSetting('hideAmounts', hideAmounts ? '1' : '0');
  },
}));
