import { ArrowRight } from 'lucide-react-native';
import { View, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, Headline } from '@/components';
import { useThemeTokens } from '@/theme';

import { WelcomeHero, WelcomeStripes } from './welcome-hero';

type Props = { onStart: () => void; onRestore: () => void };

export function WelcomeStep({ onStart, onRestore }: Props) {
  const t = useThemeTokens();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const scale = Math.max(0.7, Math.min(1, height / 844));

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <WelcomeStripes />
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <View style={{ height: 400 * scale, alignItems: 'center' }}>
          <View style={{ transform: [{ scale }], transformOrigin: 'top' }}>
            <WelcomeHero />
          </View>
        </View>

        <Animated.View entering={FadeInDown.delay(120).duration(320)}>
          <View className="px-6">
            <Headline size="lg" lead="Sache enfin " highlight="où va ton argent" tail="." />
            <AppText className="mt-3.5 text-base leading-6 text-muted">
              Banques, mobile money, espèces : tous tes comptes, ton historique et tes rappels au
              même endroit.
            </AppText>
            <View className="mt-[22px] flex-row gap-1.5">
              <View className="h-2 w-6 rounded bg-dark" />
              <View className="size-2 rounded bg-line" />
              <View className="size-2 rounded bg-line" />
              <View className="size-2 rounded bg-line" />
            </View>
          </View>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInDown.delay(220).duration(320)}
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: Math.max(insets.bottom + 12, 28),
        }}
      >
        <View className="gap-2">
          <Button
            label="Commencer"
            icon={<ArrowRight size={20} color={t.onDark} strokeWidth={2} />}
            onPress={onStart}
          />
          <Button label="J’ai déjà une sauvegarde" variant="ghost" size="sm" onPress={onRestore} />
        </View>
      </Animated.View>
    </View>
  );
}
