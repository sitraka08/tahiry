import { Redirect } from 'expo-router';

import { isOnboarded } from '@/features/onboarding';

export default function Index() {
  return <Redirect href={isOnboarded() ? '/(tabs)' : '/(onboarding)'} />;
}
