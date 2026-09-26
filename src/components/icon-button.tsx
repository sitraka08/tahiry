import type { LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View, type PressableProps } from 'react-native';

import { useThemeTokens } from '@/theme';

type Props = Omit<PressableProps, 'children'> & {
  icon: LucideIcon;
  label: string;
  tone?: 'card' | 'accent';
  badge?: number;
  className?: string;
};

export function IconButton({
  icon: Icon,
  label,
  tone = 'card',
  badge = 0,
  className = '',
  ...rest
}: Props) {
  const { ink, onAccent } = useThemeTokens();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={badge > 0 ? `${label}, ${badge} en attente` : label}
      className={`size-11 items-center justify-center rounded-[14px] ${tone === 'accent' ? 'bg-accent' : 'bg-card'} active:opacity-80 ${className}`}
      {...rest}
    >
      <Icon size={20} color={tone === 'accent' ? onAccent : ink} strokeWidth={1.8} />
      {badge > 0 ? (
        <View className="absolute -right-[5px] -top-[5px] h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1">
          <Text className="font-gs-bold text-[11px] text-on-accent">{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}
