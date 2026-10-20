import { Pressable, View } from 'react-native';

import { withAlpha } from '@/lib/color';
import { tap } from '@/lib/haptics';

import { AppText } from './app-text';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  dashed?: boolean;
  large?: boolean;
  color?: string;
};

export function Chip({
  label,
  selected = false,
  onPress,
  dashed = false,
  large = false,
  color,
}: Props) {
  const base = `${large ? 'h-10 px-4' : 'h-9 px-3.5'} flex-row items-center gap-1.5 rounded-full active:opacity-80`;
  const tinted = selected && color;
  const tone = tinted
    ? ''
    : selected
      ? 'bg-inverse'
      : dashed
        ? 'border-[1.5px] border-dashed border-seg3'
        : 'bg-tile';
  const textTone = tinted ? '' : selected ? 'text-on-inverse' : 'text-ink';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={() => {
        tap();
        onPress?.();
      }}
      style={
        tinted
          ? { backgroundColor: withAlpha(color, 0.16), borderColor: color, borderWidth: 1.5 }
          : null
      }
      className={`${base} ${tone}`}
    >
      {color ? <View style={{ backgroundColor: color }} className="size-2 rounded-full" /> : null}
      <AppText
        weight={selected ? 'bold' : 'medium'}
        style={tinted ? { color } : null}
        className={`${large ? 'text-sm' : 'text-caption'} ${textTone}`}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
