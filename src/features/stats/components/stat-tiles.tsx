import { View } from 'react-native';

import { AppText } from '@/components';
import { formatCompact } from '@/lib/money';
import { useUiStore } from '@/lib/ui-store';

type Props = { income: number; expense: number; saved: number };

function Tile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View className="flex-1 gap-0.5 rounded-card bg-card px-3.5 py-3">
      <AppText variant="micro" tone="muted">
        {label}
      </AppText>
      <AppText variant="headline" tone={accent ? 'accent' : 'ink'} numberOfLines={1}>
        {value}
      </AppText>
    </View>
  );
}

export function StatTiles({ income, expense, saved }: Props) {
  const hide = useUiStore((s) => s.hideAmounts);
  const show = (n: number) => (hide ? '••••' : `${n < 0 ? '−' : ''}${formatCompact(n)}`);

  return (
    <View className="mx-4 mt-4 flex-row gap-2">
      <Tile label="Entrées" value={show(income)} />
      <Tile label="Sorties" value={show(expense)} />
      <Tile label="Épargné" value={show(saved)} accent />
    </View>
  );
}
