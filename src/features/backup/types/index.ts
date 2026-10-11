export type Row = Record<string, string | number | boolean | null>;

export type BackupData = Record<string, Row[]>;

export type BackupFile = {
  app: 'tahiry';
  version: 1;
  exportedAt: number;
  tables: BackupData;
};

export type ParseResult = { ok: true; backup: BackupFile } | { ok: false; error: string };
