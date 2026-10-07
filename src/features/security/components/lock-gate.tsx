import type { ReactNode } from 'react';
import { View } from 'react-native';

import { useLockStore } from '../hooks/lock-store';
import { useAppLock } from '../hooks/use-app-lock';
import { useSecuritySettings } from '../hooks/use-security-settings';
import { LockScreen } from './lock-screen';

type Props = { name: string; onForgot: () => void; children: ReactNode };

export function LockGate({ name, onForgot, children }: Props) {
  const { pinEnabled, biometric, delay } = useSecuritySettings();
  const locked = useLockStore((s) => s.locked);
  useAppLock(pinEnabled, delay);

  return (
    <View style={{ flex: 1 }}>
      {children}
      {locked ? <LockScreen name={name} biometric={biometric} onForgot={onForgot} /> : null}
    </View>
  );
}
