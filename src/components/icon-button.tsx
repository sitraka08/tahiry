import type { LucideIcon } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';

import { useThemeTokens } from '@/theme';

type Props = Omit<PressableProps, 'children'> & {
  icon: LucideIcon;
  label: string;
  tone?: 'card' | 'accent';
  className?: string;
};

export function IconButton({ icon: Icon, label, tone = 'card', className = '', ...rest }: Props) {
  const { ink, onAccent } = useThemeTokens();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`size-11 items-center justify-center rounded-[14px] ${tone === 'accent' ? 'bg-accent' : 'bg-card'} active:opacity-80 ${className}`}
      {...rest}
    >
      <Icon size={20} color={tone === 'accent' ? onAccent : ink} strokeWidth={1.8} />
    </Pressable>
  );
}
