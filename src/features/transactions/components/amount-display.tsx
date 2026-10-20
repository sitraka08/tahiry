import { View } from 'react-native';

import { AppText } from '@/components';

type Props = { value: string; hint?: string; error?: string };

export function AmountDisplay({ value, hint, error }: Props) {
  return (
    <View
      accessible
      accessibilityLabel={`Montant : ${value || '0'} Ariary`}
      className="items-center gap-1.5 px-4 pt-6"
    >
      <View className="flex-row items-baseline gap-2">
        <AppText
          weight="bold"
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{ letterSpacing: -1.6 }}
          className={`shrink text-[56px] leading-[60px] ${value ? '' : 'text-subtle'}`}
        >
          {value || '0'}
        </AppText>
        <AppText weight="medium" tone="muted" className="text-title">
          Ar
        </AppText>
      </View>
      {error ? (
        <AppText variant="caption" tone="danger">
          {error}
        </AppText>
      ) : hint ? (
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}
