import { eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

import { db, setSetting, settings } from '@/db';

const KEY = 'userName';

export function useUserName() {
  const { data } = useLiveQuery(db.select().from(settings).where(eq(settings.key, KEY)));
  return data[0]?.value ?? '';
}

export function saveUserName(name: string) {
  setSetting(KEY, name.trim());
}
