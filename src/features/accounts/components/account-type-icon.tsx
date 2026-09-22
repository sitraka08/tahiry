import { Banknote, Landmark, Smartphone, Users } from 'lucide-react-native';
import { View } from 'react-native';

import { useThemeTokens } from '@/theme';

import type { AccountType } from '../types';

const ICONS = { bank: Landmark, mobile: Smartphone, cash: Banknote, group: Users };

type Props = { type: AccountType; size?: number };

export function AccountTypeIcon({ type, size = 36 }: Props) {
  const t = useThemeTokens();
  const Icon = ICONS[type];
  const tone = {
    bank: { bg: t.accent, fg: t.onAccent },
    mobile: { bg: t.dark, fg: t.onDark },
    cash: { bg: t.tile, fg: t.ink },
    group: { bg: t.tile, fg: t.ink },
  }[type];
  return (
    <View
      style={{ width: size, height: size, backgroundColor: tone.bg }}
      className="items-center justify-center rounded-xl"
    >
      <Icon size={size * 0.55} color={tone.fg} strokeWidth={1.8} />
    </View>
  );
}
