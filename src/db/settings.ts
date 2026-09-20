import { eq } from 'drizzle-orm';

import { db } from './client';
import { settings } from './schema';

export function getSetting(key: string) {
  return db.select().from(settings).where(eq(settings.key, key)).get()?.value ?? null;
}

export function setSetting(key: string, value: string) {
  db.insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({ target: settings.key, set: { value } })
    .run();
}
