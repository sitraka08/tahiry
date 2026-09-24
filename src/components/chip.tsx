import { Pressable, Text } from 'react-native';

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
    ? 'bg-dark'
    : dashed
      ? 'border-[1.5px] border-dashed border-seg3'
      : 'bg-card';
  const textTone = selected ? 'font-gs-bold text-accent' : 'font-gs-medium text-ink';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`${base} ${tone}`}
    >
      <Text className={`${large ? 'text-sm' : 'text-[13px]'} ${textTone}`}>{label}</Text>
    </Pressable>
  );
}
