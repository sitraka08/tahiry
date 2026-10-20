import { useLocalSearchParams, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, IconButton } from '@/components';
import { useAccounts } from '@/features/accounts';
import {
  TransactionForm,
  createTransaction,
  updateTransaction,
  useTransaction,
} from '@/features/transactions';
import { success } from '@/lib/haptics';
import { formatNumber } from '@/lib/money';
import { toast } from '@/lib/toast-store';

export default function AddTransaction() {
  const router = useRouter();
  const { id, type } = useLocalSearchParams<{ id?: string; type?: string }>();
  const editId = id ? Number(id) : null;
  const { accounts } = useAccounts();
  const existing = useTransaction(editId ?? 0);
  const waiting = editId != null && !existing;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row items-center justify-between px-4 pb-4 pt-5">
        <IconButton icon={X} label="Fermer" onPress={() => router.back()} />
        <AppText weight="bold" className="text-base">
          {editId ? 'Modifier l’opération' : 'Nouvelle opération'}
        </AppText>
        <View className="w-11" />
      </View>
      {accounts.length === 0 || waiting ? (
        <AppText className="px-4 text-center text-muted">
          {waiting ? 'Chargement…' : 'Ajoute d’abord un compte.'}
        </AppText>
      ) : (
        <TransactionForm
          accounts={accounts.map((a) => ({ id: a.id, name: a.name, balance: a.balance }))}
          submitLabel={editId ? 'Mettre à jour' : 'Enregistrer'}
          initialValues={
            existing
              ? {
                  type: existing.type,
                  amount: formatNumber(existing.amount),
                  accountId: existing.accountId,
                  toAccountId: existing.toAccountId,
                  categoryId: existing.categoryId,
                  note: existing.note ?? '',
                  date: existing.date,
                }
              : type === 'in' || type === 'out' || type === 'transfer'
                ? { type }
                : undefined
          }
          onSubmit={(values) => {
            if (editId) updateTransaction(editId, values);
            else createTransaction(values);
            success();
            toast(editId ? 'Opération mise à jour' : 'Opération enregistrée');
            router.back();
          }}
        />
      )}
    </SafeAreaView>
  );
}
