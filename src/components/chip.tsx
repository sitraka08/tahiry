import { Pressable } from 'react-native';

import { tap } from '@/lib/haptics';

import { AppText } from './app-text';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  dashed?: boolean;
  large?: boolean;
};

export function Chip({ label, selected = false, onPress, dashed = false, large = false }: Props) {
  const base = `${large ? 'h-10 px-3.5' : 'h-9 px-3'} justify-center rounded-full active:opacity-80`;
  const tone = selected
    ? 'bg-inverse'
    : dashed
      ? 'border-[1.5px] border-dashed border-seg3'
      : 'border border-outline';
  const textTone = selected ? 'text-on-inverse' : 'text-ink';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={() => {
        tap();
        onPress?.();
      }}
      className={`${base} ${tone}`}
    >
      <AppText
        weight={selected ? 'bold' : 'medium'}
        className={`${large ? 'text-sm' : 'text-[13px]'} ${textTone}`}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
