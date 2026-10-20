import type { ReactNode } from 'react';
import { press } from '@/lib/haptics';

import { AppText } from './app-text';
import { PressableFeedback } from './pressable-feedback';

type Variant = 'primary' | 'accent' | 'soft' | 'ghost' | 'danger';
type Size = 'lg' | 'md' | 'sm';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
};

const container: Record<Variant, string> = {
  primary: 'bg-inverse',
  accent: 'bg-accent',
  soft: 'bg-tile',
  ghost: 'bg-transparent',
  danger: 'bg-tile',
};

const text: Record<Variant, string> = {
  primary: 'text-on-inverse',
  accent: 'text-on-accent',
  soft: 'text-ink',
  ghost: 'text-ink',
  danger: 'text-danger',
};

const heights: Record<Size, string> = { lg: 'h-14', md: 'h-12', sm: 'h-11' };

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon,
  disabled,
  className = '',
}: Props) {
  const weight = variant === 'soft' || variant === 'ghost' ? 'medium' : 'bold';
  const textSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-body' : 'text-sm';
  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={() => {
        press();
        onPress?.();
      }}
      className={`flex-row items-center justify-center gap-2 rounded-full px-5 ${heights[size]} ${container[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {icon}
      <AppText weight={weight} className={`${textSize} ${text[variant]}`}>
        {label}
      </AppText>
    </PressableFeedback>
  );
}
