import { useRouter } from 'expo-router';

import { PrioritiesStep, useOnboardingStore } from '@/features/onboarding';

export default function Priorities() {
  const router = useRouter();
  const { prefs, setPrefs } = useOnboardingStore();

  return (
    <PrioritiesStep
      initial={prefs}
      onSubmit={(value) => {
        setPrefs(value);
        router.push('/(onboarding)/backup');
      }}
      onSkip={() => router.push('/(onboarding)/backup')}
    />
  );
}
