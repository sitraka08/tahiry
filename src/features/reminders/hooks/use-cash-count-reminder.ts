import { eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

import { db, getSetting, setSetting, settings } from '@/db';
import { cancelNotification, scheduleDaily, scheduleWeekly } from '@/lib/notifications';

import type { CashFrequency } from '../types';

const FREQUENCY_KEY = 'cashCountFrequency';
const NOTIFICATION_KEY = 'cashCountNotificationId';

export function useCashCountFrequency(): CashFrequency {
  const { data } = useLiveQuery(db.select().from(settings).where(eq(settings.key, FREQUENCY_KEY)));
  return (data[0]?.value as CashFrequency | undefined) ?? 'never';
}

export async function setCashCountFrequency(frequency: CashFrequency) {
  await cancelNotification(getSetting(NOTIFICATION_KEY));
  setSetting(FREQUENCY_KEY, frequency);

  const title = 'Compter mes espèces';
  const text = 'Prends deux minutes pour compter ton portefeuille.';
  const id =
    frequency === 'day'
      ? await scheduleDaily(19, 0, title, text)
      : frequency === 'week'
        ? await scheduleWeekly(1, 19, 0, title, text)
        : null;
  setSetting(NOTIFICATION_KEY, id ?? '');
}
