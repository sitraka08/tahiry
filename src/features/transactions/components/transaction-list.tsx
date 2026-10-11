import { FlashList } from '@shopify/flash-list';
import type { ReactElement } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components';

import type { DayGroup, TransactionItem } from '../types';
import { TransactionRow } from './transaction-row';

type Entry =
  | { kind: 'header'; key: string; label: string }
  | { kind: 'row'; key: string; item: TransactionItem };

type Props = {
  groups: DayGroup[];
  onPressItem: (item: TransactionItem) => void;
  header?: ReactElement;
  empty: ReactElement;
};

export function TransactionList({ groups, onPressItem, header, empty }: Props) {
  const entries: Entry[] = groups.flatMap((g) => [
    { kind: 'header' as const, key: `h-${g.key}`, label: g.label },
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
      renderItem={({ item: e }) =>
        e.kind === 'header' ? (
          <View className="mx-5 mt-3.5">
            <AppText
              weight="medium"
              className="text-xs uppercase text-muted"
              style={{ letterSpacing: 0.6 }}
            >
              {e.label}
            </AppText>
          </View>
        ) : (
          <View className="mx-5">
            <TransactionRow compact item={e.item} onPress={() => onPressItem(e.item)} />
          </View>
        )
      }
    />
  );
}
