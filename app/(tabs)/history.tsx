import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip, Headline, SearchInput } from '@/components';
import { useAccounts } from '@/features/accounts';
import {
  PeriodSummary,
  TransactionList,
  useMonthTotals,
  useTransactions,
} from '@/features/transactions';

const DAY = 86_400_000;

type Filter = 'all' | 'transfer' | number;

export default function History() {
  const router = useRouter();
  const { accounts } = useAccounts();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [now] = useState(Date.now);

  const { groups } = useTransactions({
    search,
    type: filter === 'transfer' ? 'transfer' : undefined,
    accountId: typeof filter === 'number' ? filter : undefined,
  });
  const { income, expense } = useMonthTotals(now - 30 * DAY, now + DAY);

  const header = (
    <View>
      <View className="px-5 pt-5">
        <Headline lead="Historique" />
      </View>
      <View className="mx-5 mt-3.5">
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher : taxi, loyer, salaire…"
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="gap-2 px-5 pt-3"
      >
        <Chip large label="Tout" selected={filter === 'all'} onPress={() => setFilter('all')} />
        {accounts.map((a) => (
          <Chip
            large
            key={a.id}
            label={a.name}
            selected={filter === a.id}
            onPress={() => setFilter(a.id)}
          />
        ))}
        <Chip
          large
          label="Transferts"
          selected={filter === 'transfer'}
          onPress={() => setFilter('transfer')}
        />
      </ScrollView>
      <PeriodSummary income={income} expense={expense} label="30 j" />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <TransactionList
        groups={groups}
        header={header}
        emptyLabel="Aucune opération pour ce filtre."
        onPressItem={(item) => router.push(`/transaction/${item.id}`)}
      />
    </SafeAreaView>
  );
}
