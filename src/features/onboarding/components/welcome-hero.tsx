import { Banknote, Landmark, Smartphone } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { AppText } from '@/components';
import { useThemeTokens } from '@/theme';

import { Float } from './float';

export function WelcomeHero() {
  const t = useThemeTokens();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="h-[400px] w-[390px]"
    >
      <Animated.View
        entering={ZoomIn.delay(50).duration(450)}
        style={{ position: 'absolute', left: 40, top: 110 }}
      >
        <View
          style={{ transform: [{ rotate: '-4deg' }] }}
          className="h-[230px] w-[310px] rounded-md bg-accent"
        />
      </Animated.View>

      <Float style={{ left: 62, top: 150 }} delay={200}>
        <View
          style={{ transform: [{ rotate: '-6deg' }] }}
          className="size-[92px] items-center justify-center rounded-[26px] bg-dark"
        >
          <Landmark size={44} color={t.onDark} strokeWidth={1.6} />
        </View>
      </Float>

      <Float style={{ left: 150, top: 110 }} delay={300} float={5}>
        <View
          style={{ transform: [{ rotate: '3deg' }] }}
          className="h-[150px] w-24 items-center justify-center rounded-card bg-tile"
        >
          <Smartphone size={46} color={t.ink} strokeWidth={1.6} />
        </View>
      </Float>

      <Float style={{ left: 236, top: 200 }} delay={400}>
        <View
          style={{ transform: [{ rotate: '-3deg' }] }}
          className="h-[76px] w-[110px] items-center justify-center rounded-card bg-dark"
        >
          <Banknote size={46} color={t.accent} strokeWidth={1.6} />
        </View>
      </Float>

      <Float style={{ left: 196, top: 46 }} delay={550} float={4}>
        <View className="rounded-2xl rounded-bl-[4px] bg-dark px-3.5 py-2.5">
          <AppText weight="medium" className="text-caption text-on-dark">
            −42 500 Ar · Espèces
          </AppText>
        </View>
      </Float>

      <Float style={{ left: 30, top: 300 }} delay={650} float={-4}>
        <View className="rounded-2xl rounded-br-[4px] bg-tile px-3.5 py-2.5">
          <AppText weight="bold" className="text-caption">
            +1 200 000 Ar · Banque
          </AppText>
        </View>
      </Float>
    </View>
  );
}

export function WelcomeStripes() {
  return (
    <>
      <Animated.View
        entering={FadeInDown.duration(500)}
        style={{ position: 'absolute', left: -30, top: -24 }}
      >
        <View style={{ transform: [{ rotate: '-8deg' }] }} className="h-16 w-[190px] bg-accent" />
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(120).duration(500)}
        style={{ position: 'absolute', right: -40, top: -10 }}
      >
        <View style={{ transform: [{ rotate: '5deg' }] }} className="h-10 w-[150px] bg-accent" />
      </Animated.View>
    </>
  );
}
