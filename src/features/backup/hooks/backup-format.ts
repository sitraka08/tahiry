import { z } from 'zod';

import type { BackupData, BackupFile, ParseResult } from '../types';

const cell = z.union([z.string(), z.number(), z.boolean(), z.null()]);

const fileSchema = z.object({
  app: z.literal('tahiry'),
  version: z.literal(1),
  exportedAt: z.number(),
  tables: z.record(z.string(), z.array(z.record(z.string(), cell))),
});

export const buildBackup = (tables: BackupData, exportedAt: number): BackupFile => ({
  app: 'tahiry',
  version: 1,
  exportedAt,
  tables,
});

export function parseBackup(text: string, columns: Record<string, string[]>): ParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: 'Ce fichier n’est pas une sauvegarde Tahiry.' };
  }

  const parsed = fileSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: 'Ce fichier n’est pas une sauvegarde Tahiry.' };
  }

  for (const [table, rows] of Object.entries(parsed.data.tables)) {
    const allowed = columns[table];
    if (!allowed) return { ok: false, error: `Table inconnue : ${table}.` };
    const unknown = rows.some((row) => Object.keys(row).some((key) => !allowed.includes(key)));
    if (unknown) return { ok: false, error: `Données invalides dans ${table}.` };
  }

  return { ok: true, backup: parsed.data };
}
