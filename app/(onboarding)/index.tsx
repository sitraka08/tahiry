import { useRouter } from 'expo-router';

import { WelcomeStep } from '@/features/onboarding';

export default function Welcome() {
  const router = useRouter();

  return (
    <WelcomeStep
      onStart={() => router.push('/(onboarding)/setup-accounts')}
      onRestore={() => router.push('/(onboarding)/backup')}
    />
  );
}
