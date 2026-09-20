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
    <View className="flex-row items-center justify-between px-5 pt-5">
      <IconButton icon={ChevronLeft} label="Retour" onPress={onBack ?? (() => router.back())} />
      <AppText weight="bold" className="text-base">
        {title}
      </AppText>
      <View className="size-11 items-end">{right}</View>
    </View>
  );
}
