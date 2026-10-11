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
    <View className="mx-5 mt-6 items-center gap-2.5 rounded-[22px] border border-dashed border-seg3 px-5 py-8">
      <View
        style={{ transform: [{ rotate: '-6deg' }] }}
        className="size-14 items-center justify-center rounded-[18px] bg-accent"
      >
        <Icon size={26} color={t.onAccent} strokeWidth={1.8} />
      </View>
      <AppText weight="bold" className="mt-1 text-base">
        {title}
      </AppText>
      <AppText className="text-center text-[13px] leading-[19px] text-muted">{description}</AppText>
      {actionLabel && onAction ? (
        <View className="mt-2 self-stretch">
          <Button label={actionLabel} size="sm" onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}
