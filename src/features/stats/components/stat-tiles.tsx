import { View } from 'react-native';

import { AppText } from '@/components';
import { formatCompact } from '@/lib/money';
import { useUiStore } from '@/lib/ui-store';

type Props = { income: number; expense: number; saved: number };

function Tile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View
      className={`flex-1 gap-0.5 rounded-2xl px-3 py-2.5 ${accent ? 'bg-accent' : 'border border-line bg-card'}`}
    >
      <AppText className={`text-xs ${accent ? 'text-on-accent' : 'text-muted'}`}>{label}</AppText>
      <AppText
        weight="bold"
        numberOfLines={1}
        className={`text-[17px] ${accent ? 'text-on-accent' : ''}`}
      >
        {value}
      </AppText>
    </View>
  );
}

export function StatTiles({ income, expense, saved }: Props) {
  const hide = useUiStore((s) => s.hideAmounts);
  const show = (n: number) => (hide ? '••••' : `${n < 0 ? '−' : ''}${formatCompact(n)}`);

  return (
    <View className="mx-5 mt-3.5 flex-row gap-2">
      <Tile label="Entrées" value={show(income)} />
      <Tile label="Sorties" value={show(expense)} />
      <Tile label="Épargné" value={show(saved)} accent />
    </View>
  );
}
