import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

type Props = ViewProps & { tone?: 'card' | 'dark' | 'tile'; children: ReactNode };

const tones = { card: 'bg-card', dark: 'bg-dark', tile: 'bg-tile' };

export function Card({
  tone = 'card',
  className = '',
  children,
  ...rest
}: Props & { className?: string }) {
  return (
    <View className={`rounded-[20px] p-4 ${tones[tone]} ${className}`} {...rest}>
      {children}
    </View>
  );
}
