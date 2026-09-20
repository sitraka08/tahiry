import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components';
import { useThemeTokens } from '@/theme';

export default function Welcome() {
  const router = useRouter();
  const t = useThemeTokens();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center gap-4 px-6">
        <View className="h-48 rounded-md bg-accent" style={{ transform: [{ rotate: '-4deg' }] }} />
        <AppText weight="bold" className="mt-6 text-[32px] leading-[38px]">
          Sache enfin{' '}
          <AppText weight="bold" className="bg-accent text-[32px] text-on-accent">
            {' où va ton argent '}
          </AppText>
          .
        </AppText>
        <AppText className="text-base leading-6 text-muted">
          Banques, mobile money, espèces : tous tes comptes, ton historique et tes rappels au même
          endroit.
        </AppText>
      </View>
      <View className="gap-2 px-6 pb-7">
        <Button
          label="Commencer"
          icon={<ArrowRight size={20} color={t.onDark} strokeWidth={2} />}
          onPress={() => router.push('/(onboarding)/setup-accounts')}
        />
        <Button
          label="J’ai déjà une sauvegarde Google"
          variant="ghost"
          className="h-12"
          onPress={() => router.push('/(onboarding)/backup')}
        />
      </View>
    </SafeAreaView>
  );
}
