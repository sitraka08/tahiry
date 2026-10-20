import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, TopoPattern, WelcomeIllustration } from '@/components';
import { useThemeTokens } from '@/theme';

type Props = { onStart: () => void; onRestore: () => void };

export function WelcomeStep({ onStart, onRestore }: Props) {
  const t = useThemeTokens();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top + 8, paddingBottom: Math.max(insets.bottom, 16) }}
      className="px-4"
    >
      <View className="h-14 flex-row items-center gap-2">
        <View className="size-7 items-center justify-center rounded-lg bg-accent">
          <ArrowRight size={16} color={t.onAccent} strokeWidth={2.4} />
        </View>
        <AppText variant="headline">Tahiry</AppText>
      </View>

      <Animated.View
        entering={ZoomIn.delay(50).duration(420)}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <View className="mt-2 h-72 items-center justify-end overflow-hidden rounded-card bg-card">
          <TopoPattern color={t.ink} />
          <WelcomeIllustration />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(160).duration(320)} style={{ marginTop: 28 }}>
        <View className="flex-row gap-1.5">
          <View className="h-1 w-6 rounded-full bg-ink" />
          <View className="h-1 w-2 rounded-full bg-outline" />
          <View className="h-1 w-2 rounded-full bg-outline" />
        </View>
        <AppText accessibilityRole="header" variant="display" className="mt-4">
          Tout ton argent,{'\n'}enfin au même endroit.
        </AppText>
        <AppText variant="body" tone="muted" className="mt-3">
          Mvola, banque et espèces réunis. Tout reste sur ton téléphone, même sans connexion.
        </AppText>
      </Animated.View>

      <View className="flex-1" />

      <Animated.View entering={FadeInDown.delay(240).duration(320)} style={{ gap: 8 }}>
        <Button
          label="Commencer"
          variant="accent"
          icon={<ArrowRight size={20} color={t.onAccent} strokeWidth={2} />}
          onPress={onStart}
        />
        <Button label="Restaurer une sauvegarde" variant="ghost" size="sm" onPress={onRestore} />
      </Animated.View>
    </View>
  );
}
