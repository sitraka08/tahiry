import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { AppText } from './app-text';
import { IconButton } from './icon-button';

type Props = { title: string; right?: ReactNode; onBack?: () => void };

export function ScreenHeader({ title, right, onBack }: Props) {
  const router = useRouter();
  return (
    <View className="flex-row items-center gap-3 px-5 pt-4">
      <IconButton icon={ChevronLeft} label="Retour" onPress={onBack ?? (() => router.back())} />
      <AppText
        accessibilityRole="header"
        weight="bold"
        numberOfLines={1}
        className="flex-1 text-center text-[17px]"
      >
        {title}
      </AppText>
      <View className="size-11 items-end">{right}</View>
    </View>
  );
}
