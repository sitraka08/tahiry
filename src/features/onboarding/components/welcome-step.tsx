import { ArrowRight } from 'lucide-react-native';
import { View, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, Headline } from '@/components';
import { useThemeTokens } from '@/theme';

import { WelcomeHero, WelcomeStripes } from './welcome-hero';

type Props = { onStart: () => void; onRestore: () => void };

export function WelcomeStep({ onStart, onRestore }: Props) {
  const t = useThemeTokens();
  const { height } = useWindowDimensions();
  const scale = Math.max(0.7, Math.min(1, height / 844));

  return (
    <View className="flex-1 overflow-hidden">
      <WelcomeStripes />
      <SafeAreaView className="flex-1">
        <View style={{ height: 400 * scale }} className="items-center">
          <View style={{ transform: [{ scale }], transformOrigin: 'top' }}>
            <WelcomeHero />
          </View>
        </View>

        <View className="px-6">
          <Animated.View entering={FadeInDown.delay(500).duration(500)}>
            <Headline size="lg" lead="Sache enfin " highlight="où va ton argent" tail="." />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(620).duration(500)}>
            <AppText className="mt-3.5 text-base leading-6 text-muted">
              Banques, mobile money, espèces : tous tes comptes, ton historique et tes rappels au
              même endroit.
            </AppText>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(740).duration(500)}
            className="mt-[22px] flex-row gap-1.5"
          >
            <View className="h-2 w-6 rounded bg-dark" />
            <View className="size-2 rounded bg-line" />
            <View className="size-2 rounded bg-line" />
            <View className="size-2 rounded bg-line" />
          </Animated.View>
        </View>

        <Animated.View
          entering={FadeInDown.delay(860).duration(500)}
          className="absolute inset-x-6 bottom-7 gap-2"
        >
          <Button
            label="Commencer"
            icon={<ArrowRight size={20} color={t.onDark} strokeWidth={2} />}
            onPress={onStart}
          />
          <Button
            label="J’ai déjà une sauvegarde Google"
            variant="ghost"
            size="sm"
            onPress={onRestore}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
