import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

import { setSetting } from '@/db';

const HASH_KEY = 'pinHash';
const SALT_KEY = 'pinSalt';

const digest = (salt: string, pin: string) =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${pin}`);

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

export async function savePin(pin: string) {
  const salt = toHex(await Crypto.getRandomBytesAsync(16));
  await SecureStore.setItemAsync(SALT_KEY, salt);
  await SecureStore.setItemAsync(HASH_KEY, await digest(salt, pin));
  setSetting('pinEnabled', '1');
}

export async function verifyPin(pin: string) {
  const [salt, hash] = await Promise.all([
    SecureStore.getItemAsync(SALT_KEY),
    SecureStore.getItemAsync(HASH_KEY),
  ]);
  if (!salt || !hash) return false;
  return (await digest(salt, pin)) === hash;
}

export async function removePin() {
  await SecureStore.deleteItemAsync(SALT_KEY);
  await SecureStore.deleteItemAsync(HASH_KEY);
  setSetting('pinEnabled', '0');
  setSetting('biometric', '0');
}
