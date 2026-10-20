import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchX } from 'lucide-react-native';

import { AppText, Chip, EmptyState, SearchInput } from '@/components';
import { useAccounts } from '@/features/accounts';
import {
  PeriodSummary,
  TransactionList,
  useMonthTotals,
  useTransactions,
  type TransactionType,
} from '@/features/transactions';

const DAY = 86_400_000;

type Filter = 'all' | TransactionType | number;

const TYPES: { value: TransactionType; label: string }[] = [
  { value: 'out', label: 'Dépenses' },
  { value: 'in', label: 'Revenus' },
  { value: 'transfer', label: 'Transferts' },
];

export default function History() {
  const router = useRouter();
  const { accounts } = useAccounts();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [now] = useState(Date.now);

  const { groups } = useTransactions({
    search,
    type: typeof filter === 'string' && filter !== 'all' ? filter : undefined,
    accountId: typeof filter === 'number' ? filter : undefined,
  });
  const { income, expense } = useMonthTotals(now - 30 * DAY, now + DAY);

  const header = (
    <View>
      <View className="px-4 pt-6">
        <AppText accessibilityRole="header" variant="display">
          Historique
        </AppText>
      </View>
      <View className="mx-4 mt-4">
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
        contentContainerClassName="gap-2 px-4 pt-3"
      >
        <Chip large label="Tout" selected={filter === 'all'} onPress={() => setFilter('all')} />
        {TYPES.map((f) => (
          <Chip
            large
            key={f.value}
            label={f.label}
            selected={filter === f.value}
            onPress={() => setFilter(f.value)}
          />
        ))}
        {accounts.map((a) => (
          <Chip
            large
            key={a.id}
            label={a.name}
            selected={filter === a.id}
            onPress={() => setFilter(a.id)}
          />
        ))}
      </ScrollView>
      <PeriodSummary income={income} expense={expense} label="30 derniers jours" />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <TransactionList
        groups={groups}
        header={header}
        empty={
          <EmptyState
            icon={SearchX}
            title="Rien à afficher"
            description={
              search || filter !== 'all'
                ? 'Aucune opération ne correspond à ta recherche ou à ce filtre.'
                : 'Tes opérations apparaîtront ici dès que tu en ajoutes une.'
            }
          />
        }
        onPressItem={(item) => router.push(`/transaction/${item.id}`)}
      />
    </SafeAreaView>
  );
}
