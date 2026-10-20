import { ArrowDownRight, ArrowUpRight, Eye, EyeOff, Nfc } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { withAlpha } from '@/lib/color';
import { THEMES, useThemeTokens } from '@/theme';

import { AppText } from './app-text';
import { TopoPattern } from './topo-pattern';

// The card is always dark, so its accents come from the dark scheme.
const DARK = THEMES.dark;

type Change = { label: string; positive: boolean };

type Props = {
  amount: string;
  holder: string;
  hidden: boolean;
  onToggleHidden: () => void;
  change: Change | null;
  colors: string[];
};

function CardChip() {
  const line = withAlpha(DARK.dark, 0.35);
  return (
    <Svg width={42} height={32} viewBox="0 0 42 32">
      <Rect x={1} y={1} width={40} height={30} rx={6} fill={DARK.catSand} stroke={line} />
      <Path d="M1 11h13M1 21h13M28 11h13M28 21h13M14 1v30M28 1v30" stroke={line} />
      <Rect x={14} y={8} width={14} height={16} rx={2} fill={DARK.catSand} stroke={line} />
    </Svg>
  );
}

function AccountMark({ colors }: { colors: string[] }) {
  const shown = colors.slice(0, 3);
  const width = 28 + (shown.length - 1) * 15;
  return (
    <Svg width={width} height={28} viewBox={`0 0 ${width} 28`}>
      {shown.map((c, i) => (
        <Circle key={`${c}-${i}`} cx={14 + i * 15} cy={14} r={13} fill={c} fillOpacity={0.9} />
      ))}
    </Svg>
  );
}

export function BalanceCard({ amount, holder, hidden, onToggleHidden, change, colors }: Props) {
  const t = useThemeTokens();
  const EyeIcon = hidden ? EyeOff : Eye;
  const ChangeIcon = change?.positive ? ArrowUpRight : ArrowDownRight;
  const changeColor = change?.positive ? DARK.accent : DARK.onDark;

  return (
    <View
      style={{
        aspectRatio: 1.586,
        boxShadow: `0 14px 30px ${t.shadow}`,
        borderColor: withAlpha(DARK.onDark, 0.07),
      }}
      className="mx-4 overflow-hidden rounded-bank border bg-dark px-5 py-4"
    >
      <TopoPattern color={DARK.onDark} opacity={0.045} />
      <View className="flex-row items-center justify-between">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hidden ? 'Afficher les montants' : 'Masquer les montants'}
          onPress={onToggleHidden}
          hitSlop={10}
          className="min-h-11 flex-row items-center gap-1.5"
        >
          <AppText variant="caption" className="text-dark-muted">
            Solde total
          </AppText>
          <EyeIcon size={15} color={DARK.darkMuted} strokeWidth={1.9} />
        </Pressable>
        {colors.length > 0 ? <AccountMark colors={colors} /> : null}
      </View>

      <View className="mt-1 flex-row items-center gap-2.5">
        <CardChip />
        <Nfc size={22} color={DARK.darkMuted} strokeWidth={1.8} />
      </View>

      <View className="flex-1" />

      <View className="flex-row items-baseline gap-2">
        <AppText
          weight="bold"
          numberOfLines={1}
          adjustsFontSizeToFit
          className="shrink text-hero text-on-dark"
        >
          {amount}
        </AppText>
        <AppText weight="medium" className="text-lg text-dark-muted">
          Ar
        </AppText>
      </View>

      <View className="mt-2.5 flex-row items-center justify-between gap-3">
        <AppText
          weight="medium"
          numberOfLines={1}
          style={{ letterSpacing: 2.4 }}
          className="flex-1 text-xs uppercase text-on-dark opacity-80"
        >
          {holder}
        </AppText>
        {change ? (
          <View
            style={{ backgroundColor: withAlpha(changeColor, 0.12) }}
            className="h-6 flex-row items-center gap-1 rounded-full px-2.5"
          >
            <ChangeIcon size={12} color={changeColor} strokeWidth={2.6} />
            <AppText weight="bold" style={{ color: changeColor }} className="text-xs">
              {change.label}
            </AppText>
          </View>
        ) : null}
      </View>
    </View>
  );
}
