import { Plus } from 'lucide-react-native';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { AccountIllustration, AppText, PressableFeedback } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';
import { accountVisual } from '@/lib/visuals';
import { useThemeTokens } from '@/theme';

import { litTicks, shareOf } from '../hooks/account-math';
import type { AccountType, AccountWithBalance } from '../types';

const TICKS = 26;
const KIND: Record<AccountType, string> = {
  mobile: 'Mobile',
  bank: 'Banque',
  cash: 'Espèces',
  group: 'Groupe',
};

function Gauge({ share, color }: { share: number; color: string }) {
  const t = useThemeTokens();
  const lit = litTicks(share, TICKS);
  return (
    <Svg width="100%" height={10} viewBox="0 0 120 10" preserveAspectRatio="none">
      {Array.from({ length: TICKS }, (_, i) => (
        <Path
          key={i}
          d={`M${1 + i * 4.6} 1V9`}
          stroke={i < lit ? color : t.raised}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
}

type Props = { account: AccountWithBalance; total: number; onPress: () => void };

export function AccountCard({ account, total, onPress }: Props) {
  const t = useThemeTokens();
  const fmt = useAmountMask();
  const share = shareOf(account.balance, total);
  const color = t[accountVisual(account.type).color];

  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityLabel={`${account.name}, ${fmt(account.balance)}, ${share} % du total`}
      onPress={onPress}
      className="w-[152px] gap-2.5 rounded-card bg-card px-3.5 pb-3 pt-3.5"
    >
      <View className="flex-row items-start justify-between">
        <AccountIllustration type={account.type} />
        <AppText variant="micro" weight="bold" style={{ color }}>
          {share} %
        </AppText>
      </View>
      <View>
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {account.name} · {KIND[account.type]}
        </AppText>
        <AppText variant="headline" numberOfLines={1} adjustsFontSizeToFit>
          {fmt(account.balance, false)}
        </AppText>
      </View>
      <Gauge share={share} color={color} />
    </PressableFeedback>
  );
}

export function AddAccountCard({ onPress }: { onPress: () => void }) {
  const t = useThemeTokens();
  return (
    <PressableFeedback
      accessibilityRole="button"
      accessibilityLabel="Ajouter un compte"
      onPress={onPress}
      className="w-24 items-center justify-center gap-2 rounded-card border-[1.5px] border-dashed border-outline"
    >
      <Plus size={22} color={t.muted} strokeWidth={1.9} />
      <AppText variant="caption" weight="medium" tone="muted">
        Ajouter
      </AppText>
    </PressableFeedback>
  );
}
