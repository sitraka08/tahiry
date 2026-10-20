import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { AppText } from '@/components';
import { formatCompact } from '@/lib/money';
import { useUiStore } from '@/lib/ui-store';
import { useThemeTokens } from '@/theme';

import type { AccountGroup } from '../types';

const SIZE = 132;
const R = 58;
const STROKE = 22;
const CIRC = 2 * Math.PI * R;

type Props = { groups: AccountGroup[]; total: number };

export function AccountsDonut({ groups, total }: Props) {
  const t = useThemeTokens();
  const hide = useUiStore((s) => s.hideAmounts);
  const colors = { bank: t.accent, mobile: t.dark, cash: t.seg3, group: t.muted };
  const visible = groups.filter((g) => g.total > 0);

  let offset = 0;
  const arcs = visible.map((g) => {
    const length = (g.total / total) * CIRC;
    const arc = { type: g.type, length, offset };
    offset += length + 2;
    return arc;
  });

  return (
    <View className="flex-row items-center gap-[18px] rounded-card bg-card p-4">
      <View style={{ width: SIZE, height: SIZE }} className="items-center justify-center">
        <Svg width={SIZE} height={SIZE} viewBox="0 0 150 150">
          <Circle cx={75} cy={75} r={R} fill="none" stroke={t.tile} strokeWidth={STROKE} />
          {total > 0
            ? arcs.map((a) => (
                <Circle
                  key={a.type}
                  cx={75}
                  cy={75}
                  r={R}
                  fill="none"
                  stroke={colors[a.type]}
                  strokeWidth={STROKE}
                  strokeDasharray={`${Math.max(a.length - 2, 0)} ${CIRC}`}
                  strokeDashoffset={-a.offset}
                  transform="rotate(-90 75 75)"
                />
              ))
            : null}
        </Svg>
        <View style={{ position: 'absolute' }} className="items-center">
          <AppText className="text-micro text-muted">Total</AppText>
          <AppText weight="bold" className="text-lg">
            {hide ? '••••' : formatCompact(total)}
          </AppText>
          <AppText className="text-micro text-muted">Ar</AppText>
        </View>
      </View>
      <View className="flex-1 gap-3">
        {visible.map((g) => (
          <View key={g.type} className="flex-row items-center gap-2">
            <View style={{ backgroundColor: colors[g.type] }} className="size-3 rounded-[3px]" />
            <AppText className="flex-1 text-sm" numberOfLines={1}>
              {g.label} ({g.accounts.length})
            </AppText>
            <AppText weight="bold" className="text-sm">
              {total > 0 ? Math.round((g.total / total) * 100) : 0} %
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}
