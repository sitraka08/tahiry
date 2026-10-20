import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { tap } from '@/lib/haptics';

import { AppText } from './app-text';

type Props = {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  accessibilityLabel?: string;
};

const ROW = 'min-h-16 flex-row items-center gap-3 px-4 py-2';

export function ListRow({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  onLongPress,
  accessibilityLabel,
}: Props) {
  const body = (
    <>
      {leading}
      <View className="flex-1 gap-0.5">
        <AppText variant="body" weight="medium" numberOfLines={1}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing}
    </>
  );

  if (!onPress) return <View className={ROW}>{body}</View>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={() => {
        tap();
        onPress();
      }}
      onLongPress={onLongPress}
      className={`${ROW} active:bg-tile`}
    >
      {body}
    </Pressable>
  );
}
