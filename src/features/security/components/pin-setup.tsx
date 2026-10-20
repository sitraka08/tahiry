import { KeyRound } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components';
import { success } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

import { appendDigit, isComplete, removeDigit } from '../hooks/pin-logic';
import { savePin } from '../hooks/pin-store';
import { PinDots } from './pin-dots';
import { PinKeypad } from './pin-keypad';

type Props = { onDone: () => void };

export function PinSetup({ onDone }: Props) {
  const t = useThemeTokens();
  const insets = useSafeAreaInsets();
  const [first, setFirst] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(0);
  const [mismatch, setMismatch] = useState(false);
  const confirming = first !== null;

  const onDigit = async (digit: string) => {
    const next = appendDigit(pin, digit);
    setPin(next);
    if (!isComplete(next)) return;

    if (!confirming) {
      setFirst(next);
      setPin('');
      setMismatch(false);
      return;
    }
    if (next === first) {
      await savePin(next);
      success();
      onDone();
      return;
    }
    setShake((n) => n + 1);
    setMismatch(true);
    setFirst(null);
    setPin('');
  };

  return (
    <View className="flex-1">
      <View className="items-center px-6 pt-12">
        <View
          style={{ transform: [{ rotate: '-6deg' }] }}
          className="size-16 items-center justify-center rounded-card bg-accent"
        >
          <KeyRound size={30} color={t.onAccent} strokeWidth={1.8} />
        </View>
        <AppText weight="bold" className="mt-5 text-2xl">
          {confirming ? 'Confirme ton code' : 'Choisis un code à 4 chiffres'}
        </AppText>
        <AppText
          className={`mt-1.5 text-center text-sm ${mismatch ? 'text-danger' : 'text-muted'}`}
        >
          {mismatch
            ? 'Les deux codes sont différents. Recommence.'
            : confirming
              ? 'Tape le même code une seconde fois.'
              : 'Il protège ton argent si quelqu’un prend ton téléphone.'}
        </AppText>
        <View className="mt-7">
          <PinDots filled={pin.length} shake={shake} />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          bottom: Math.max(insets.bottom, 16) + 24,
        }}
      >
        <PinKeypad onDigit={onDigit} onBackspace={() => setPin(removeDigit(pin))} />
      </View>
    </View>
  );
}
