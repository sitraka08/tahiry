import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

import { db, setSetting, settings } from '@/db';

import type { LockDelay } from '../types';

export function useSecuritySettings() {
  const { data } = useLiveQuery(db.select().from(settings));
  const get = (key: string) => data.find((row) => row.key === key)?.value;
  return {
    pinEnabled: get('pinEnabled') === '1',
    biometric: get('biometric') === '1',
    delay: Number(get('lockDelay') ?? 0) as LockDelay,
  };
}

export const setLockDelay = (delay: LockDelay) => setSetting('lockDelay', String(delay));
export const setBiometric = (on: boolean) => setSetting('biometric', on ? '1' : '0');
