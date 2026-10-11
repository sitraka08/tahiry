import { create } from 'zustand';

type ToastState = {
  id: number;
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  id: 0,
  message: null,
  show: (message) => set((s) => ({ id: s.id + 1, message })),
  hide: () => set({ message: null }),
}));

export const toast = (message: string) => useToastStore.getState().show(message);
