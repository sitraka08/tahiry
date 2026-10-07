import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components';
import { PinManage, PinSetup, useSecuritySettings } from '@/features/security';

export default function Pin() {
  const router = useRouter();
  const { pinEnabled } = useSecuritySettings();
  const [changing, setChanging] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title="Code PIN" />
      {pinEnabled && !changing ? (
        <PinManage onChange={() => setChanging(true)} onDone={() => router.back()} />
      ) : (
        <PinSetup onDone={() => (changing ? setChanging(false) : null)} />
      )}
    </SafeAreaView>
  );
}
