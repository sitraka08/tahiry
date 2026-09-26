import { useRouter } from 'expo-router';
import { Banknote } from 'lucide-react-native';
import { Pressable, Switch, View } from 'react-native';

import { AppText } from '@/components';
import { useThemeTokens } from '@/theme';

import type { CashFrequency } from '../types';

type Props = { frequency: CashFrequency; onChange: (frequency: CashFrequency) => void };

const LABEL = { day: 'Chaque soir · 19:00', week: 'Chaque dimanche · 19:00', never: 'Désactivé' };

export function CashCountRow({ frequency, onChange }: Props) {
  const t = useThemeTokens();
  const router = useRouter();
  const active = frequency !== 'never';

  return (
    <View className="flex-row items-center gap-3 py-2">
      <View className="h-12 w-[46px] items-center justify-center rounded-xl bg-card">
        <Banknote size={22} color={t.ink} strokeWidth={1.8} />
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/cash-count')}
        className="min-w-0 flex-1 gap-0.5"
      >
        <AppText weight="medium" className="text-[15px]">
          Compter mes espèces
        </AppText>
        <AppText className="text-xs text-muted">{LABEL[frequency]}</AppText>
      </Pressable>
      <View className="flex-row items-center gap-1.5">
        <AppText className="text-xs">Actif</AppText>
        <Switch
          accessibilityLabel="Rappel pour compter mes espèces"
          value={active}
          onValueChange={(on) => onChange(on ? 'week' : 'never')}
          trackColor={{ true: t.dark, false: t.line }}
          thumbColor={active ? t.accent : t.tile}
        />
      </View>
    </View>
  );
}
