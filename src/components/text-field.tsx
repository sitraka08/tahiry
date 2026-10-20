import { useState } from 'react';
import { View, type TextInputProps } from 'react-native';

import { formatNumber, parseAmount } from '@/lib/money';
import { AppText } from './app-text';
import { AppTextInput } from './app-text-input';

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
  const [focused, setFocused] = useState(false);
  const border = error ? 'border-danger' : focused ? 'border-ink' : 'border-transparent';

  return (
    <View className={className}>
      {label ? (
        <AppText weight="medium" className="mb-1.5 text-caption text-muted">
          {label}
        </AppText>
      ) : null}
      <View className={`h-12 flex-row items-center rounded-2xl border bg-card px-3.5 ${border}`}>
        <AppTextInput
          accessibilityLabel={label ?? rest.placeholder}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="flex-1 py-0 text-body"
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
