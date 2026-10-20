import { Fingerprint, Lock } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components';
import { success } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

import { authenticateWithBiometrics, biometricsAvailable } from '../hooks/biometrics';
import { useLockStore } from '../hooks/lock-store';
import { PIN_LENGTH, appendDigit, isComplete, removeDigit } from '../hooks/pin-logic';
import { verifyPin } from '../hooks/pin-store';
import { PinDots } from './pin-dots';
import { PinKeypad } from './pin-keypad';

type Props = { name: string; biometric: boolean; onForgot: () => void };

export function LockScreen({ name, biometric, onForgot }: Props) {
  const t = useThemeTokens();
  const insets = useSafeAreaInsets();
  const unlock = useLockStore((s) => s.unlock);
  const fail = useLockStore((s) => s.fail);
  const blockedUntil = useLockStore((s) => s.blockedUntil);
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(0);
  const [canUseBiometrics, setCanUseBiometrics] = useState(false);

  const tryBiometrics = useCallback(async () => {
    if (await authenticateWithBiometrics()) {
      success();
      unlock();
    }
  }, [unlock]);

  useEffect(() => {
    if (!biometric) return;
    biometricsAvailable().then((ok) => {
      setCanUseBiometrics(ok);
      if (ok) tryBiometrics();
    });
  }, [biometric, tryBiometrics]);

  const submit = async (value: string) => {
    if (await verifyPin(value)) {
      success();
      unlock();
      return;
    }
    fail();
    setShake((n) => n + 1);
    setPin('');
  };

  const onDigit = (digit: string) => {
    if (Date.now() < blockedUntil) {
      const seconds = Math.ceil((blockedUntil - Date.now()) / 1000);
      Alert.alert('Trop d’essais', `Réessaie dans ${seconds} secondes.`);
      return;
    }
    const next = appendDigit(pin, digit);
    setPin(next);
    if (isComplete(next) && next.length === PIN_LENGTH) submit(next);
  };

  return (
    <View
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 50 }}
      className="bg-dark"
    >
      <View
        style={{ position: 'absolute', left: -30, top: -20, transform: [{ rotate: '-8deg' }] }}
        className="h-14 w-[180px] bg-accent"
      />
      <View style={{ paddingTop: 120 }} className="items-center px-6">
        <View className="size-16 items-center justify-center rounded-full bg-accent">
          <Lock size={28} color={t.onAccent} strokeWidth={1.8} />
        </View>
        <AppText weight="bold" className="mt-5 text-2xl text-on-dark">
          {name ? `Bon retour, ${name}` : 'Bon retour'}
        </AppText>
        <AppText className="mt-1.5 text-sm text-dark-muted">
          Entre ton code pour ouvrir l’app
        </AppText>
        <View className="mt-[26px]">
          <PinDots tone="dark" filled={pin.length} shake={shake} />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          bottom: Math.max(insets.bottom, 16) + 74,
        }}
      >
        <PinKeypad
          tone="dark"
          onDigit={onDigit}
          onBackspace={() => setPin(removeDigit(pin))}
          leftKey={
            canUseBiometrics ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Déverrouiller avec l’empreinte"
                onPress={tryBiometrics}
                className="size-[72px] items-center justify-center"
              >
                <Fingerprint size={30} color={t.accent} strokeWidth={1.8} />
              </Pressable>
            ) : null
          }
        />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onForgot}
        style={{ position: 'absolute', left: 0, right: 0, bottom: Math.max(insets.bottom, 16) + 8 }}
        className="h-11 items-center justify-center"
      >
        <AppText className="text-caption text-dark-muted">Code oublié ?</AppText>
      </Pressable>
    </View>
  );
}
