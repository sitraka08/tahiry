import { Pressable, Text } from 'react-native';

import { tap } from '@/lib/haptics';

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
  const textTone = selected ? 'font-gs-bold text-on-inverse' : 'font-gs-medium text-ink';
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
      <Text className={`${large ? 'text-sm' : 'text-[13px]'} ${textTone}`}>{label}</Text>
    </Pressable>
  );
}
