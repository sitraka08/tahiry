import { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { formatNumber, parseAmount } from '@/lib/money';
import { useThemeTokens } from '@/theme';

import { AppText } from './app-text';

type FieldProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  error?: string;
  suffix?: string;
  className?: string;
};

export function TextField({
  label,
  error,
  suffix,
  className = '',
  onFocus,
  onBlur,
  ...rest
}: FieldProps) {
  const t = useThemeTokens();
  const [focused, setFocused] = useState(false);
  const border = error ? 'border-danger' : focused ? 'border-ink' : 'border-outline';

  return (
    <View className={className}>
      {label ? (
        <AppText weight="medium" className="mb-1.5 text-[13px] text-muted">
          {label}
        </AppText>
      ) : null}
      <View className={`h-12 flex-row items-center rounded-[14px] border bg-tile px-3.5 ${border}`}>
        <TextInput
          accessibilityLabel={label ?? rest.placeholder}
          placeholderTextColor={t.muted}
          selectionColor={t.ink}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="flex-1 py-0 font-gs text-[15px] text-ink"
        />
        {suffix ? <AppText className="ml-2 text-sm text-muted">{suffix}</AppText> : null}
      </View>
      {error ? <AppText className="mt-1 text-xs text-danger">{error}</AppText> : null}
    </View>
  );
}

type MoneyProps = Omit<FieldProps, 'value' | 'onChangeText' | 'suffix' | 'keyboardType'> & {
  value: string;
  onChangeValue: (value: string) => void;
};

export function MoneyField({ value, onChangeValue, placeholder = '0', ...rest }: MoneyProps) {
  return (
    <TextField
      {...rest}
      suffix="Ar"
      keyboardType="number-pad"
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => {
        const n = parseAmount(text);
        onChangeValue(n ? formatNumber(n) : '');
      }}
    />
  );
}
