import { useRouter } from 'expo-router';

import { PrioritiesStep, useOnboardingStore } from '@/features/onboarding';

export default function Priorities() {
  const router = useRouter();
  const { prefs, setPrefs } = useOnboardingStore();
  const next = () => router.push('/(onboarding)/backup');

  return (
    <PrioritiesStep
      initial={prefs}
      onBack={() => router.back()}
      onSkip={next}
      onSubmit={(value) => {
        setPrefs(value);
        next();
      }}
    />
  );
}
