import { useRouter } from 'expo-router';

import { AccountsStep, useOnboardingStore } from '@/features/onboarding';

export default function SetupAccounts() {
  const router = useRouter();
  const { accounts, setAccounts } = useOnboardingStore();

  return (
    <AccountsStep
      initial={accounts}
      onSubmit={(value) => {
        setAccounts(value);
        router.push('/(onboarding)/priorities');
      }}
      onSkip={() => router.push('/(onboarding)/priorities')}
    />
  );
}
