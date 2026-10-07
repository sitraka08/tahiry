import { Delete } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { tap } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

type Props = {
  tone: 'light' | 'dark';
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  leftKey?: ReactNode;
};

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

function Digit({
  digit,
  dark,
  onDigit,
}: {
  digit: string;
  dark: boolean;
  onDigit: (digit: string) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={digit}
      onPress={() => {
        tap();
        onDigit(digit);
      }}
      className={`size-[72px] items-center justify-center rounded-full active:opacity-60 ${
        dark ? 'bg-white/10' : 'border border-line bg-card'
      }`}
    >
      <AppText weight="medium" className={`text-[26px] ${dark ? 'text-on-dark' : 'text-ink'}`}>
        {digit}
      </AppText>
    </Pressable>
  );
}

export function PinKeypad({ tone, onDigit, onBackspace, leftKey }: Props) {
  const t = useThemeTokens();
  const dark = tone === 'dark';

  return (
    <View className="gap-3.5">
      {ROWS.map((row) => (
        <View key={row[0]} className="flex-row justify-between">
          {row.map((digit) => (
            <Digit key={digit} digit={digit} dark={dark} onDigit={onDigit} />
          ))}
        </View>
      ))}
      <View className="flex-row justify-between">
        <View className="size-[72px] items-center justify-center">{leftKey}</View>
        <Digit digit="0" dark={dark} onDigit={onDigit} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Effacer"
          onPress={() => {
            tap();
            onBackspace();
          }}
          className="size-[72px] items-center justify-center rounded-full active:opacity-60"
        >
          <Delete size={26} color={dark ? t.onDark : t.ink} strokeWidth={1.8} />
        </Pressable>
      </View>
    </View>
  );
}
