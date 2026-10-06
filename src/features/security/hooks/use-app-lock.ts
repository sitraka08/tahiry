import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

import { useLockStore } from './lock-store';
import { shouldLock } from './pin-logic';

export function useAppLock(enabled: boolean, delayMinutes: number) {
  const lock = useLockStore((s) => s.lock);
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'background') backgroundedAt.current = Date.now();
      if (state === 'active' && shouldLock(backgroundedAt.current, Date.now(), delayMinutes)) {
        lock();
      }
      if (state === 'active') backgroundedAt.current = null;
    });
    return () => subscription.remove();
  }, [enabled, delayMinutes, lock]);
}
