import { notInArray } from 'drizzle-orm';

import { db, settings, sqlite } from '@/db';

import type { BackupData, BackupFile, Row } from '../types';
import { LOCAL_ONLY_SETTINGS, TABLES, tableName } from './backup-tables';

const CHUNK = 40;

export function readAllData(): BackupData {
  return Object.fromEntries(
    TABLES.map((table) => {
      const rows = db.select().from(table).all() as Row[];
      const kept =
        table === settings
          ? rows.filter((r) => !LOCAL_ONLY_SETTINGS.includes(String(r.key)))
          : rows;
      return [tableName(table), kept];
    }),
  );
}

export function replaceAllData(backup: BackupFile) {
  sqlite.withTransactionSync(() => {
    [...TABLES].reverse().forEach((table) => {
      if (table === settings) {
        db.delete(settings).where(notInArray(settings.key, LOCAL_ONLY_SETTINGS)).run();
      } else {
        db.delete(table).run();
      }
    });
    TABLES.forEach((table) => {
      const rows = backup.tables[tableName(table)] ?? [];
      for (let i = 0; i < rows.length; i += CHUNK) {
        db.insert(table)
          .values(rows.slice(i, i + CHUNK) as never)
          .run();
      }
    });
  });
}
