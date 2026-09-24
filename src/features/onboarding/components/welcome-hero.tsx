import { Banknote, Landmark, Smartphone } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AppText } from '@/components';
import { useThemeTokens } from '@/theme';

export function WelcomeHero() {
  const t = useThemeTokens();
  return (
    <Animated.View
      entering={FadeIn.duration(350)}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="h-[400px] w-[390px]"
    >
      <View
        style={{ position: 'absolute', left: 40, top: 110, transform: [{ rotate: '-4deg' }] }}
        className="h-[230px] w-[310px] rounded-md bg-accent"
      />
      <View
        style={{ position: 'absolute', left: 62, top: 150, transform: [{ rotate: '-6deg' }] }}
        className="size-[92px] items-center justify-center rounded-[26px] bg-dark"
      >
        <Landmark size={44} color={t.onDark} strokeWidth={1.6} />
      </View>
      <View
        style={{ position: 'absolute', left: 150, top: 110, transform: [{ rotate: '3deg' }] }}
        className="h-[150px] w-24 items-center justify-center rounded-[22px] bg-tile"
      >
        <Smartphone size={46} color={t.ink} strokeWidth={1.6} />
      </View>
      <View
        style={{ position: 'absolute', left: 236, top: 200, transform: [{ rotate: '-3deg' }] }}
        className="h-[76px] w-[110px] items-center justify-center rounded-[18px] bg-dark"
      >
        <Banknote size={46} color={t.accent} strokeWidth={1.6} />
      </View>
      <View
        style={{ position: 'absolute', left: 196, top: 46 }}
        className="rounded-2xl rounded-bl-[4px] bg-dark px-3.5 py-2.5"
      >
        <AppText weight="medium" className="text-[13px] text-on-dark">
          −42 500 Ar · Espèces
        </AppText>
      </View>
      <View
        style={{ position: 'absolute', left: 30, top: 300 }}
        className="rounded-2xl rounded-br-[4px] bg-tile px-3.5 py-2.5"
      >
        <AppText weight="bold" className="text-[13px]">
          +1 200 000 Ar · Banque
        </AppText>
      </View>
    </Animated.View>
  );
}

export function WelcomeStripes() {
  return (
    <>
      <View
        style={{ position: 'absolute', left: -30, top: -24, transform: [{ rotate: '-8deg' }] }}
        className="h-16 w-[190px] bg-accent"
      />
      <View
        style={{ position: 'absolute', right: -40, top: -10, transform: [{ rotate: '5deg' }] }}
        className="h-10 w-[150px] bg-accent"
      />
    </>
  );
}
