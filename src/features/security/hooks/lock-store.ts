import { create } from 'zustand';

import { cooldownMs } from './pin-logic';

type LockState = {
  locked: boolean;
  failures: number;
  blockedUntil: number;
  lock: () => void;
  unlock: () => void;
  fail: () => void;
};

export const useLockStore = create<LockState>((set, get) => ({
  locked: false,
  failures: 0,
  blockedUntil: 0,
  lock: () => set({ locked: true }),
  unlock: () => set({ locked: false, failures: 0, blockedUntil: 0 }),
  fail: () => {
    const failures = get().failures + 1;
    set({ failures, blockedUntil: Date.now() + cooldownMs(failures) });
  },
}));
