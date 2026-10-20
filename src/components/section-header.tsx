import { Pressable, View } from 'react-native';

import { AppText } from './app-text';

type Props = { title: string; actionLabel?: string; onAction?: () => void };

export function SectionHeader({ title, actionLabel, onAction }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 pb-2 pt-7">
      <AppText accessibilityRole="header" variant="headline">
        {title}
      </AppText>
      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          hitSlop={12}
          className="min-h-11 justify-center active:opacity-60"
        >
          <AppText variant="caption" weight="medium" tone="muted">
            {actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}
