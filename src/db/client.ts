import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

import { MIGRATIONS } from './migrations';
import * as schema from './schema';
import { IN_CATEGORIES, OUT_CATEGORIES } from './seed';

export const sqlite = openDatabaseSync('tahiry.db', { enableChangeListener: true });
export const db = drizzle(sqlite, { schema });

function seedCategories() {
  const row = sqlite.getFirstSync<{ n: number }>('SELECT COUNT(*) AS n FROM categories');
  if (row && row.n > 0) return;
  const insert = (kind: 'out' | 'in', list: [string, string][]) =>
    list.forEach(([key, label], position) =>
      sqlite.runSync('INSERT INTO categories (kind, key, label, position) VALUES (?, ?, ?, ?)', [
        kind,
        key,
        label,
        position,
      ]),
    );
  insert('out', OUT_CATEGORIES);
  insert('in', IN_CATEGORIES);
}

export function migrate() {
  sqlite.execSync('PRAGMA foreign_keys = ON');
  const row = sqlite.getFirstSync<{ user_version: number }>('PRAGMA user_version');
  const current = row?.user_version ?? 0;
  MIGRATIONS.slice(current).forEach((statements, i) => {
    sqlite.withTransactionSync(() => {
      statements.forEach((sql) => sqlite.execSync(sql));
      sqlite.execSync(`PRAGMA user_version = ${current + i + 1}`);
    });
  });
  seedCategories();
}
