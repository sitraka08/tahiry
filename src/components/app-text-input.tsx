import type { Ref } from 'react';
// eslint-disable-next-line no-restricted-imports
import { TextInput, type TextInputProps } from 'react-native';

import { useThemeTokens } from '@/theme';

import { family, type Weight } from './app-text';

type Props = TextInputProps & { weight?: Weight; className?: string; ref?: Ref<TextInput> };

export function AppTextInput({ weight = 'regular', className = '', ...rest }: Props) {
  const t = useThemeTokens();
  return (
    <TextInput
      placeholderTextColor={t.muted}
      selectionColor={t.accent}
      {...rest}
      allowFontScaling={false}
      className={`${family[weight]} text-ink ${className}`}
    />
  );
}
