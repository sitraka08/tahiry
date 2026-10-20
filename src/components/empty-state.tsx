import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { useThemeTokens } from '@/theme';

import { AppText } from './app-text';
import { Button } from './button';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: Props) {
  const t = useThemeTokens();
  return (
    <View className="mx-4 mt-6 items-center gap-2.5 rounded-card bg-card px-4 py-8">
      <View className="size-14 items-center justify-center rounded-full bg-tile">
        <Icon size={26} color={t.ink} strokeWidth={1.8} />
      </View>
      <AppText variant="headline" className="mt-1">
        {title}
      </AppText>
      <AppText variant="caption" tone="muted" className="text-center">
        {description}
      </AppText>
      {actionLabel && onAction ? (
        <View className="mt-2 self-stretch">
          <Button label={actionLabel} size="sm" onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}
