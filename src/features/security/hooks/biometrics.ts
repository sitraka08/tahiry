import * as LocalAuthentication from 'expo-local-authentication';

export async function biometricsAvailable() {
  const [hardware, enrolled] = await Promise.all([
    LocalAuthentication.hasHardwareAsync(),
    LocalAuthentication.isEnrolledAsync(),
  ]);
  return hardware && enrolled;
}

export async function authenticateWithBiometrics() {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Déverrouiller Tahiry',
    cancelLabel: 'Utiliser le code',
    disableDeviceFallback: true,
  });
  return result.success;
}
