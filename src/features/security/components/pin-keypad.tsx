import { Delete } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { tap } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

type Props = {
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  leftKey?: ReactNode;
};

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

function Digit({ digit, onDigit }: { digit: string; onDigit: (digit: string) => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={digit}
      onPress={() => {
        tap();
        onDigit(digit);
      }}
      className="size-[72px] items-center justify-center rounded-full bg-card active:bg-tile"
    >
      <AppText weight="medium" className="text-[26px]">
        {digit}
      </AppText>
    </Pressable>
  );
}

export function PinKeypad({ onDigit, onBackspace, leftKey }: Props) {
  const t = useThemeTokens();

  return (
    <View className="gap-3.5">
      {ROWS.map((row) => (
        <View key={row[0]} className="flex-row justify-between">
          {row.map((digit) => (
            <Digit key={digit} digit={digit} onDigit={onDigit} />
          ))}
        </View>
      ))}
      <View className="flex-row justify-between">
        <View className="size-[72px] items-center justify-center">{leftKey}</View>
        <Digit digit="0" onDigit={onDigit} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Effacer"
          onPress={() => {
            tap();
            onBackspace();
          }}
          className="size-[72px] items-center justify-center rounded-full active:opacity-60"
        >
          <Delete size={26} color={t.ink} strokeWidth={1.8} />
        </Pressable>
      </View>
    </View>
  );
}
