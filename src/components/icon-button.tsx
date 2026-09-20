import type { LucideIcon } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';

import { useThemeTokens } from '@/theme';

type Props = Omit<PressableProps, 'children'> & {
  icon: LucideIcon;
  label: string;
  className?: string;
};

export function IconButton({ icon: Icon, label, className = '', ...rest }: Props) {
  const { ink } = useThemeTokens();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`size-11 items-center justify-center rounded-[14px] bg-card active:opacity-80 ${className}`}
      {...rest}
    >
      <Icon size={20} color={ink} strokeWidth={1.8} />
    </Pressable>
  );
}
