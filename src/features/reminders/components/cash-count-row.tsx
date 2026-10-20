import { useRouter } from 'expo-router';
import { Banknote } from 'lucide-react-native';
import { Pressable, Switch, View } from 'react-native';

import { AppText, IconTile } from '@/components';
import { useThemeTokens } from '@/theme';

import type { CashFrequency } from '../types';

type Props = { frequency: CashFrequency; onChange: (frequency: CashFrequency) => void };

const LABEL = { day: 'Chaque soir · 19:00', week: 'Chaque dimanche · 19:00', never: 'Désactivé' };

export function CashCountRow({ frequency, onChange }: Props) {
  const t = useThemeTokens();
  const router = useRouter();
  const active = frequency !== 'never';

  return (
    <View className="min-h-16 flex-row items-center gap-3 px-4 py-2">
      <IconTile icon={Banknote} color="catSand" />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/cash-count')}
        className="min-w-0 flex-1 gap-0.5"
      >
        <AppText variant="body" weight="medium">
          Compter mes espèces
        </AppText>
        <AppText variant="caption" tone="muted">
          {LABEL[frequency]}
        </AppText>
      </Pressable>
      <Switch
        accessibilityLabel="Rappel pour compter mes espèces"
        value={active}
        onValueChange={(on) => onChange(on ? 'week' : 'never')}
        trackColor={{ true: t.accent, false: t.raised }}
        thumbColor={t.card}
      />
    </View>
  );
}
