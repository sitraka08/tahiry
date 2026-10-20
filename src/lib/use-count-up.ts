import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

import { countAt } from './count-up';

const DURATION = 700;

// Counts toward the value on mount and whenever it changes.
export function useCountUp(value: number) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);
  const from = useRef(shown);

  useEffect(() => {
    if (reduced) {
      from.current = value;
      setShown(value);
      return;
    }
    const start = from.current;
    const began = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const p = (now - began) / DURATION;
      const next = countAt(start, value, p);
      from.current = next;
      setShown(next);
      if (p < 1) frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
  }, [value, reduced]);

  return shown;
}
