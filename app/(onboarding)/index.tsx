import { useRouter } from 'expo-router';

import { restoreBackup } from '@/features/backup';
import { WelcomeStep, markOnboarded } from '@/features/onboarding';
import { hydrateSettings } from '@/features/settings';

export default function Welcome() {
  const router = useRouter();

  return (
    <WelcomeStep
      onStart={() => router.push('/(onboarding)/setup-accounts')}
      onRestore={() =>
        restoreBackup({
          confirm: false,
          onRestored: () => {
            hydrateSettings();
            markOnboarded();
            router.replace('/(tabs)');
          },
        })
      }
    />
  );
}
