import type { ReactNode } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'accent' | 'soft' | 'ghost' | 'danger';

type Props = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
};

const container: Record<Variant, string> = {
  primary: 'bg-dark',
  accent: 'bg-accent',
  soft: 'bg-card',
  ghost: 'bg-transparent',
  danger: 'bg-card',
};

const text: Record<Variant, string> = {
  primary: 'text-on-dark',
  accent: 'text-on-accent',
  soft: 'text-ink',
  ghost: 'text-ink',
  danger: 'text-danger',
};

export function Button({ label, variant = 'primary', icon, className = '', ...rest }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`h-14 flex-row items-center justify-center gap-2 rounded-[18px] active:opacity-80 ${container[variant]} ${className}`}
      {...rest}
    >
      {icon}
      <Text className={`font-gs-bold text-base ${text[variant]}`}>{label}</Text>
    </Pressable>
  );
}
