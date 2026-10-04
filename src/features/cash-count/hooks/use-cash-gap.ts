import { eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

import { db, setSetting, settings } from '@/db';

import type { CashGap } from '../types';

const KEY = 'cashGap';

export function useCashGap(): CashGap | null {
  const { data } = useLiveQuery(db.select().from(settings).where(eq(settings.key, KEY)));
  const value = data[0]?.value;
  return value ? (JSON.parse(value) as CashGap) : null;
}

export const saveCashGap = (gap: CashGap) => setSetting(KEY, JSON.stringify(gap));
export const clearCashGap = () => setSetting(KEY, '');
