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
    <View className="flex-row items-center gap-3 rounded-2xl bg-card py-1.5 pl-3.5 pr-1.5">
      <AppText weight="bold" className="w-[72px] text-body">
        {formatNumber(value)}
      </AppText>
      <AppText className="flex-1 text-caption text-muted">
        = {formatNumber(value * count)} Ar
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Retirer un billet de ${formatNumber(value)}`}
        onPress={() => {
          tap();
          onChange(-1);
        }}
        className="size-11 items-center justify-center rounded-xl bg-tile active:opacity-70"
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
        className="size-11 items-center justify-center rounded-xl bg-dark active:opacity-70"
      >
        <Plus size={20} color={t.accent} strokeWidth={2} />
      </Pressable>
    </View>
  );
}
