import { useRouter } from 'expo-router';

import { AccountsStep, useOnboardingStore } from '@/features/onboarding';

export default function SetupAccounts() {
  const router = useRouter();
  const { accounts, setAccounts } = useOnboardingStore();
  const next = () => router.push('/(onboarding)/priorities');

  return (
    <AccountsStep
      initial={accounts}
      onBack={() => router.back()}
      onSkip={next}
      onSubmit={(value) => {
        setAccounts(value);
        next();
      }}
    />
  );
}
