import { format } from 'date-fns';
import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { allowedColumns } from './backup-tables';
import { buildBackup, parseBackup } from './backup-format';
import { readAllData } from './backup-data';
import type { ParseResult } from '../types';

export async function shareBackup() {
  const now = Date.now();
  const file = new File(Paths.cache, `tahiry-sauvegarde-${format(now, 'yyyy-MM-dd')}.json`);
  file.create({ overwrite: true });
  file.write(JSON.stringify(buildBackup(readAllData(), now)));
  await Sharing.shareAsync(file.uri, {
    mimeType: 'application/json',
    dialogTitle: 'Enregistrer ma sauvegarde Tahiry',
  });
}

export async function pickBackup(): Promise<ParseResult | null> {
  const picked = await DocumentPicker.getDocumentAsync({
    type: ['application/json', 'text/plain', '*/*'],
    copyToCacheDirectory: true,
  });
  if (picked.canceled) return null;
  const text = await new File(picked.assets[0].uri).text();
  return parseBackup(text, allowedColumns());
}
