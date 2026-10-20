import { FlashList } from '@shopify/flash-list';
import type { ReactElement } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components';
import { useAmountMask } from '@/lib/use-amount-mask';

import type { DayGroup, TransactionItem } from '../types';
import { TransactionRow } from './transaction-row';

type Entry =
  | { kind: 'header'; key: string; label: string; net: number }
  | { kind: 'row'; key: string; item: TransactionItem };

type Props = {
  groups: DayGroup[];
  onPressItem: (item: TransactionItem) => void;
  header?: ReactElement;
  empty: ReactElement;
};

export function TransactionList({ groups, onPressItem, header, empty }: Props) {
  const fmt = useAmountMask();
  const entries: Entry[] = groups.flatMap((g) => [
    { kind: 'header' as const, key: `h-${g.key}`, label: g.label, net: g.net },
    ...g.items.map((item) => ({ kind: 'row' as const, key: `r-${item.id}`, item })),
  ]);

  return (
    <FlashList
      data={entries}
      keyExtractor={(e) => e.key}
      getItemType={(e) => e.kind}
      ListHeaderComponent={header}
      ListEmptyComponent={empty}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 112 }}
      renderItem={({ item: e }) =>
        e.kind === 'header' ? (
          <View className="flex-row items-baseline justify-between px-4 pb-1 pt-5">
            <AppText
              variant="caption"
              weight="bold"
              tone="muted"
              className="uppercase"
              style={{ letterSpacing: 0.4 }}
            >
              {e.label}
            </AppText>
            {e.net !== 0 ? (
              <AppText variant="caption" tone={e.net > 0 ? 'accent' : 'muted'}>
                {e.net > 0 ? '+' : '−'}
                {fmt(Math.abs(e.net), false)}
              </AppText>
            ) : null}
          </View>
        ) : (
          <TransactionRow item={e.item} onPress={() => onPressItem(e.item)} />
        )
      }
    />
  );
}
