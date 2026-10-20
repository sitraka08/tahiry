import { ArrowRight, Check, Cloud, Smartphone } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInRight, ZoomIn } from 'react-native-reanimated';

import { AppText, Button, Headline } from '@/components';
import { useThemeTokens } from '@/theme';

import { Float } from './float';
import { OnboardingShell } from './onboarding-shell';

const PERKS = [
  'Sauvegarde automatique chaque jour',
  'Restauration en 1 minute sur un nouveau téléphone',
  'Aucun accès à tes comptes bancaires',
];

type Props = { onFinish: () => void; onBack: () => void };

function BackupHero() {
  const t = useThemeTokens();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="mt-2.5 h-[210px] w-[390px] self-center"
    >
      <Animated.View
        entering={ZoomIn.delay(50).duration(450)}
        style={{ position: 'absolute', left: 50, top: 40 }}
      >
        <View
          style={{ transform: [{ rotate: '-3deg' }] }}
          className="h-[130px] w-[290px] rounded-md bg-accent"
        />
      </Animated.View>
      <Float style={{ left: 76, top: 30 }} delay={200}>
        <View
          style={{ transform: [{ rotate: '-5deg' }] }}
          className="h-[140px] w-[84px] items-center justify-center rounded-card bg-inverse"
        >
          <Smartphone size={40} color={t.onInverse} strokeWidth={1.6} />
        </View>
      </Float>
      <Float style={{ left: 172, top: 84 }} delay={350} float={6} axis="x">
        <ArrowRight size={44} color={t.ink} strokeWidth={2.4} />
      </Float>
      <Float style={{ left: 228, top: 52 }} delay={450} float={5}>
        <View
          style={{ transform: [{ rotate: '4deg' }] }}
          className="h-[92px] w-[104px] items-center justify-center rounded-card bg-tile"
        >
          <Cloud size={50} color={t.ink} strokeWidth={1.6} />
        </View>
      </Float>
    </View>
  );
}

export function BackupStep({ onFinish, onBack }: Props) {
  const t = useThemeTokens();
  return (
    <OnboardingShell
      step={3}
      onBack={onBack}
      headerRight={{ kind: 'badge', label: 'Facultatif' }}
      title={
        <>
          <BackupHero />
          <Headline lead="Ne perds jamais " highlight="ton historique" tail="." />
        </>
      }
      subtitle="Connecte ton compte Google pour sauvegarder tes données. Tu changes ou perds ton téléphone ? Tu retrouves tout."
      footer={
        <>
          <Button
            label="Continuer avec Google"
            disabled
            icon={
              <View className="size-[26px] items-center justify-center rounded-full bg-on-dark">
                <AppText weight="bold" className="text-body">
                  G
                </AppText>
              </View>
            }
          />
          <Button
            label="Plus tard, rester sur ce téléphone"
            variant="soft"
            size="md"
            onPress={onFinish}
          />
          <AppText className="mt-0.5 text-center text-xs text-muted">
            La sauvegarde Google arrive bientôt. En attendant, exporte un fichier depuis Réglages.
          </AppText>
        </>
      }
    >
      <View className="mt-4 gap-3 rounded-card bg-card px-4 py-3.5">
        {PERKS.map((perk, i) => (
          <Animated.View key={perk} entering={FadeInRight.delay(250 + i * 90).duration(320)}>
            <View className="flex-row items-center gap-2.5">
              <View className="size-6 items-center justify-center rounded-full bg-accent">
                <Check size={14} color={t.onAccent} strokeWidth={3} />
              </View>
              <AppText className="flex-1 text-sm">{perk}</AppText>
            </View>
          </Animated.View>
        ))}
      </View>
    </OnboardingShell>
  );
}
