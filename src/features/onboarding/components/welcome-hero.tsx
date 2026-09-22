import { Banknote, Landmark, Smartphone } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

import { AppText } from '@/components';
import { useThemeTokens } from '@/theme';

import { Floating } from './floating';

export function WelcomeHero() {
  const t = useThemeTokens();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="h-[400px] w-[390px]"
    >
      <Animated.View
        entering={ZoomIn.delay(100).duration(500)}
        style={{ position: 'absolute', left: 40, top: 110, transform: [{ rotate: '-4deg' }] }}
        className="h-[230px] w-[310px] rounded-md bg-accent"
      />

      <Floating
        style={{ left: 62, top: 150 }}
        rotate={-6}
        delay={250}
        amplitude={5}
        duration={2400}
      >
        <View className="size-[92px] items-center justify-center rounded-[26px] bg-dark">
          <Landmark size={44} color={t.onDark} strokeWidth={1.6} />
        </View>
      </Floating>

      <Floating
        style={{ left: 150, top: 110 }}
        rotate={3}
        delay={350}
        amplitude={7}
        duration={2800}
      >
        <View className="h-[150px] w-24 items-center justify-center rounded-[22px] bg-tile">
          <Smartphone size={46} color={t.ink} strokeWidth={1.6} />
        </View>
      </Floating>

      <Floating
        style={{ left: 236, top: 200 }}
        rotate={-3}
        delay={450}
        amplitude={5}
        duration={2200}
      >
        <View className="h-[76px] w-[110px] items-center justify-center rounded-[18px] bg-dark">
          <Banknote size={46} color={t.accent} strokeWidth={1.6} />
        </View>
      </Floating>

      <Floating style={{ left: 196, top: 46 }} delay={650} amplitude={4} duration={2600}>
        <View className="rounded-2xl rounded-bl-[4px] bg-dark px-3.5 py-2.5">
          <AppText weight="medium" className="text-[13px] text-on-dark">
            −42 500 Ar · Espèces
          </AppText>
        </View>
      </Floating>

      <Floating style={{ left: 30, top: 300 }} delay={800} amplitude={5} duration={3000}>
        <View className="rounded-2xl rounded-br-[4px] bg-tile px-3.5 py-2.5">
          <AppText weight="bold" className="text-[13px]">
            +1 200 000 Ar · Banque
          </AppText>
        </View>
      </Floating>
    </View>
  );
}

export function WelcomeStripes() {
  return (
    <>
      <Animated.View
        entering={FadeInUp.duration(600)}
        style={{ position: 'absolute', left: -30, top: -24, transform: [{ rotate: '-8deg' }] }}
        className="h-16 w-[190px] bg-accent"
      />
      <Animated.View
        entering={FadeInUp.delay(150).duration(600)}
        style={{ position: 'absolute', right: -40, top: -10, transform: [{ rotate: '5deg' }] }}
        className="h-10 w-[150px] bg-accent"
      />
    </>
  );
}
