import { Minus, Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { tap } from '@/lib/haptics';
import { formatNumber } from '@/lib/money';
import { useThemeTokens } from '@/theme';

type Props = {
  value: number;
  count: number;
  onChange: (delta: number) => void;
};

export function CountRow({ value, count, onChange }: Props) {
  const t = useThemeTokens();
  return (
    <View className="flex-row items-center gap-3 rounded-card bg-card py-1.5 pl-4 pr-1.5">
      <AppText variant="body" weight="bold" className="w-20">
        {formatNumber(value)}
      </AppText>
      <AppText variant="caption" tone="muted" className="flex-1">
        = {formatNumber(value * count)} Ar
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Retirer un billet de ${formatNumber(value)}`}
        onPress={() => {
          tap();
          onChange(-1);
        }}
        className="size-11 items-center justify-center rounded-full bg-tile active:opacity-70"
      >
        <Minus size={20} color={t.ink} strokeWidth={2} />
      </Pressable>
      <AppText weight="bold" className="w-7 text-center text-base">
        {count}
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ajouter un billet de ${formatNumber(value)}`}
        onPress={() => {
          tap();
          onChange(1);
        }}
        className="size-11 items-center justify-center rounded-full bg-accent active:opacity-70"
      >
        <Plus size={20} color={t.onAccent} strokeWidth={2} />
      </Pressable>
    </View>
  );
}
