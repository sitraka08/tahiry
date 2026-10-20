import { Delete } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { tap } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

import type { AmountKey } from '../hooks/amount-keys';

const KEYS: AmountKey[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'back'];

type Props = { onKey: (key: AmountKey) => void };

export function AmountKeypad({ onKey }: Props) {
  const t = useThemeTokens();
  return (
    <View className="flex-row flex-wrap px-4">
      {KEYS.map((key) => (
        <Pressable
          key={key}
          accessibilityRole="button"
          accessibilityLabel={key === 'back' ? 'Effacer' : key}
          onPress={() => {
            tap();
            onKey(key);
          }}
          className="h-14 w-1/3 items-center justify-center rounded-full active:bg-tile"
        >
          {key === 'back' ? (
            <Delete size={26} color={t.ink} strokeWidth={1.8} />
          ) : (
            <AppText
              weight="medium"
              className={key === '000' ? 'text-xl text-muted' : 'text-[26px]'}
            >
              {key}
            </AppText>
          )}
        </Pressable>
      ))}
    </View>
  );
}
