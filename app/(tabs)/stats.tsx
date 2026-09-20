import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components';

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <AppText>Bientôt</AppText>
    </SafeAreaView>
  );
}
