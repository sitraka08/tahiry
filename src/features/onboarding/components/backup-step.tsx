import { ArrowRight, Check, Cloud, Smartphone } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText, Button, Headline } from '@/components';
import { useThemeTokens } from '@/theme';

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
      <View
        style={{ position: 'absolute', left: 50, top: 40, transform: [{ rotate: '-3deg' }] }}
        className="h-[130px] w-[290px] rounded-md bg-accent"
      />
      <View
        style={{ position: 'absolute', left: 76, top: 30, transform: [{ rotate: '-5deg' }] }}
        className="h-[140px] w-[84px] items-center justify-center rounded-[20px] bg-dark"
      >
        <Smartphone size={40} color={t.onDark} strokeWidth={1.6} />
      </View>
      <View style={{ position: 'absolute', left: 172, top: 84 }}>
        <ArrowRight size={44} color={t.ink} strokeWidth={2.4} />
      </View>
      <View
        style={{ position: 'absolute', left: 228, top: 52, transform: [{ rotate: '4deg' }] }}
        className="h-[92px] w-[104px] items-center justify-center rounded-3xl bg-tile"
      >
        <Cloud size={50} color={t.ink} strokeWidth={1.6} />
      </View>
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
                <AppText weight="bold" className="text-[15px]">
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
            La sauvegarde Google arrive bientôt. Tu pourras l’activer dans Réglages.
          </AppText>
        </>
      }
    >
      <View className="mt-4 gap-3 rounded-[20px] bg-card px-4 py-3.5">
        {PERKS.map((perk) => (
          <View key={perk} className="flex-row items-center gap-2.5">
            <View className="size-6 items-center justify-center rounded-full bg-dark">
              <Check size={14} color={t.accent} strokeWidth={3} />
            </View>
            <AppText className="flex-1 text-sm">{perk}</AppText>
          </View>
        ))}
      </View>
    </OnboardingShell>
  );
}
