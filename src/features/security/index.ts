export { authenticateWithBiometrics, biometricsAvailable } from './hooks/biometrics';
export { useLockStore } from './hooks/lock-store';
export { PIN_LENGTH, appendDigit, isComplete, removeDigit } from './hooks/pin-logic';
export { removePin, savePin, verifyPin } from './hooks/pin-store';
export { useAppLock } from './hooks/use-app-lock';
export { resetAllData } from './hooks/use-reset';
export { setBiometric, setLockDelay, useSecuritySettings } from './hooks/use-security-settings';
export type { LockDelay, PinStep } from './types';
