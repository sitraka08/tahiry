import { create } from 'zustand';

type UiState = {
  hideAmounts: boolean;
  setHideAmounts: (value: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  hideAmounts: false,
  setHideAmounts: (hideAmounts) => set({ hideAmounts }),
}));
