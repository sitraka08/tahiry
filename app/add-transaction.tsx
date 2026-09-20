import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, IconButton } from '@/components';
import { useAccounts } from '@/features/accounts';
import { TransactionForm, createTransaction } from '@/features/transactions';

export default function AddTransaction() {
  const router = useRouter();
  const { accounts } = useAccounts();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-5 pb-4 pt-5">
        <IconButton icon={X} label="Fermer" onPress={() => router.back()} />
        <AppText weight="bold" className="text-base">
          Nouvelle opération
        </AppText>
        <View className="w-11" />
      </View>
      {accounts.length > 0 ? (
        <TransactionForm
          accounts={accounts.map((a) => ({ id: a.id, name: a.name, balance: a.balance }))}
          onSubmit={(values) => {
            createTransaction(values);
            router.back();
          }}
        />
      ) : (
        <AppText className="px-5 text-center text-muted">Ajoute d’abord un compte.</AppText>
      )}
    </SafeAreaView>
  );
}
