import { TextInput, View } from 'react-native';

import { AppText } from '@/components';
import { formatNumber, parseAmount } from '@/lib/money';

type Props = { value: string; onChange: (value: string) => void; error?: string };

export function AmountInput({ value, onChange, error }: Props) {
  return (
    <View className="mt-4 items-center gap-0.5">
      <AppText className="text-[13px] text-muted">Montant</AppText>
      <View className="flex-row items-baseline gap-1.5">
        <TextInput
          accessibilityLabel="Montant"
          value={value}
          onChangeText={(text) => {
            const n = parseAmount(text);
            onChange(n ? formatNumber(n) : '');
          }}
          keyboardType="number-pad"
          placeholder="0"
          placeholderTextColor="#8A8D78"
          className="w-[220px] p-0 text-right font-gs-bold text-[44px] text-ink"
        />
        <AppText weight="medium" className="text-[22px]">
          Ar
        </AppText>
      </View>
      <View className="-mt-1 h-2 w-[140px] rounded-sm bg-accent" />
      {error ? <AppText className="mt-1 text-xs text-danger">{error}</AppText> : null}
    </View>
  );
}
