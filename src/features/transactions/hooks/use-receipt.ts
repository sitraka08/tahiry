import { Directory, File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export async function pickReceipt(transactionId: number) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.7,
  });
  if (result.canceled) return null;

  const uri = result.assets[0].uri;
  try {
    const dir = new Directory(Paths.document, 'receipts');
    dir.create({ idempotent: true, intermediates: true });
    const dest = new File(dir, `receipt-${transactionId}-${Date.now()}.jpg`);
    new File(uri).copy(dest);
    return dest.uri;
  } catch {
    return uri;
  }
}
