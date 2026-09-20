import { asc, eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

import { categories, db } from '@/db';

export function useCategories(kind: 'out' | 'in') {
  const { data } = useLiveQuery(
    db
      .select()
      .from(categories)
      .where(eq(categories.kind, kind))
      .orderBy(asc(categories.position), asc(categories.id)),
    [kind],
  );
  return data;
}

export function createCategory(kind: 'out' | 'in', label: string) {
  const position = db.select().from(categories).where(eq(categories.kind, kind)).all().length;
  return db.insert(categories).values({ kind, label, position }).returning().get();
}
