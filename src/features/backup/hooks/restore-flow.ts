import { Alert } from 'react-native';

import { replaceAllData } from './backup-data';
import { pickBackup } from './backup-files';

type Options = { confirm: boolean; onRestored: () => void };

export async function restoreBackup({ confirm, onRestored }: Options) {
  const result = await pickBackup();
  if (!result) return;
  if (!result.ok) {
    Alert.alert('Sauvegarde invalide', result.error);
    return;
  }

  const apply = () => {
    replaceAllData(result.backup);
    onRestored();
  };
  if (!confirm) {
    apply();
    return;
  }
  Alert.alert(
    'Remplacer mes données ?',
    'Tes données actuelles seront remplacées par la sauvegarde.',
    [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Remplacer', style: 'destructive', onPress: apply },
    ],
  );
}
