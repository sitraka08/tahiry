import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText } from '@/components';
import { createAccount } from '@/features/accounts';
import { OnboardingShell, markOnboarded, useOnboardingStore } from '@/features/onboarding';
import { setSetting } from '@/db';
import { useThemeTokens } from '@/theme';

const PERKS = [
  'Sauvegarde automatique chaque jour',
  'Restauration en 1 minute sur un nouveau téléphone',
  'Aucun accès à tes comptes bancaires',
];

export default function Backup() {
  const router = useRouter();
  const t = useThemeTokens();
  const { accounts, prefs } = useOnboardingStore();

  const finish = () => {
    accounts.forEach((a) => createAccount({ type: a.type, name: a.name, balance: a.balance }));
    setSetting('prefs', JSON.stringify(prefs));
    markOnboarded();
    router.replace('/(tabs)');
  };

  return (
    <OnboardingShell
      step={2}
      title="Ne perds jamais ton historique."
      subtitle="Connecte ton compte Google pour sauvegarder tes données. Facultatif."
      actionLabel="Plus tard, rester sur ce téléphone"
      onAction={finish}
    >
      <View className="gap-3">
        {PERKS.map((p) => (
          <View key={p} className="flex-row items-center gap-3">
            <View className="size-7 items-center justify-center rounded-full bg-accent">
              <Check size={16} color={t.onAccent} strokeWidth={2.4} />
            </View>
            <AppText className="flex-1 text-[15px]">{p}</AppText>
          </View>
        ))}
      </View>
      <AppText className="text-xs text-muted">
        Tu pourras l’activer à tout moment dans Réglages.
      </AppText>
    </OnboardingShell>
  );
}
