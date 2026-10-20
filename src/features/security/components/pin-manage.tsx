import { Check, Fingerprint } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Switch, View } from 'react-native';

import { AppText, Button, Segmented, TopoPattern } from '@/components';
import { tap } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

import { biometricsAvailable } from '../hooks/biometrics';
import { useLockStore } from '../hooks/lock-store';
import { removePin } from '../hooks/pin-store';
import { setBiometric, setLockDelay, useSecuritySettings } from '../hooks/use-security-settings';
import type { LockDelay } from '../types';

const DELAYS: { value: `${LockDelay}`; label: string }[] = [
  { value: '0', label: 'Tout de suite' },
  { value: '1', label: 'Après 1 min' },
  { value: '5', label: 'Après 5 min' },
];

type Props = { onChange: () => void; onDone: () => void };

export function PinManage({ onChange, onDone }: Props) {
  const t = useThemeTokens();
  const { biometric, delay } = useSecuritySettings();
  const unlock = useLockStore((s) => s.unlock);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    biometricsAvailable().then(setAvailable);
  }, []);

  const disable = () =>
    Alert.alert('Désactiver le code ?', 'L’app s’ouvrira sans code.', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Désactiver',
        style: 'destructive',
        onPress: async () => {
          await removePin();
          unlock();
          onDone();
        },
      },
    ]);

  return (
    <View className="px-4 pt-8">
      <View className="flex-row items-center gap-3.5 overflow-hidden rounded-card bg-card p-5">
        <TopoPattern color={t.ink} />
        <View className="size-12 items-center justify-center rounded-full bg-accent">
          <Check size={24} color={t.onAccent} strokeWidth={2.4} />
        </View>
        <View className="gap-0.5">
          <AppText variant="headline">Code PIN activé</AppText>
          <AppText variant="caption" tone="muted">
            Il sera demandé à chaque ouverture.
          </AppText>
        </View>
      </View>

      <View className="mt-4 rounded-card bg-card px-3.5 py-1">
        {available ? (
          <View className="min-h-[52px] flex-row items-center gap-3">
            <Fingerprint size={20} color={t.ink} strokeWidth={1.8} />
            <AppText className="flex-1 text-body">Déverrouiller avec l’empreinte</AppText>
            <Switch
              accessibilityLabel="Déverrouiller avec l’empreinte"
              value={biometric}
              onValueChange={(on) => {
                tap();
                setBiometric(on);
              }}
              trackColor={{ true: t.accent, false: t.raised }}
              thumbColor={t.card}
            />
          </View>
        ) : null}
        <View className="gap-2.5 py-3">
          <AppText className="text-body">Verrouiller l’app</AppText>
          <Segmented
            options={DELAYS}
            value={`${delay}` as `${LockDelay}`}
            onChange={(value) => setLockDelay(Number(value) as LockDelay)}
          />
        </View>
      </View>

      <View className="mt-2.5 gap-2">
        <Button label="Changer le code" variant="soft" size="sm" onPress={onChange} />
        <Button label="Désactiver le code" variant="danger" size="sm" onPress={disable} />
      </View>
    </View>
  );
}
