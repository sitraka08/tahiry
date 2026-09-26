import { useRouter } from 'expo-router';

import { setSetting } from '@/db';
import { createAccount } from '@/features/accounts';
import { BackupStep, markOnboarded, useOnboardingStore } from '@/features/onboarding';
import { setCashCountFrequency } from '@/features/reminders';

export default function Backup() {
  const router = useRouter();
  const { accounts, prefs } = useOnboardingStore();

  const finish = () => {
    accounts.forEach((a) => createAccount({ type: a.type, name: a.name, balance: a.balance }));
    setSetting('prefs', JSON.stringify(prefs));
    setCashCountFrequency(prefs.frequency);
    markOnboarded();
    router.replace('/(tabs)');
  };

  return <BackupStep onBack={() => router.back()} onFinish={finish} />;
}
