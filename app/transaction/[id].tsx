import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, IconButton, ScreenHeader } from '@/components';
import { useBottomInset } from '@/lib/use-bottom-inset';
import {
  TransactionDetail,
  deleteTransaction,
  duplicateTransaction,
  pickReceipt,
  setReceipt,
  useBalanceAfter,
  useTransaction,
} from '@/features/transactions';

export default function TransactionScreen() {
  const router = useRouter();
  const bottomInset = useBottomInset(16);
  const { id } = useLocalSearchParams<{ id: string }>();
  const txId = Number(id);
  const item = useTransaction(txId);
  const balanceAfter = useBalanceAfter(item?.accountId ?? 0, item?.date ?? 0, txId);

  if (!item) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenHeader title="Opération" />
        <AppText className="mt-10 text-center text-muted">Opération introuvable.</AppText>
      </SafeAreaView>
    );
  }

  const confirmDelete = () =>
    Alert.alert('Supprimer cette opération ?', 'Les soldes seront recalculés.', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          deleteTransaction(txId);
          router.back();
        },
      },
    ]);

  const duplicate = () => {
    const copy = duplicateTransaction(txId);
    if (copy) router.replace(`/transaction/${copy.id}`);
  };

  const changeReceipt = async () => {
    const uri = await pickReceipt(txId);
    if (uri) setReceipt(txId, uri);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="Opération"
        right={
          <IconButton
            icon={Pencil}
            label="Modifier"
            onPress={() => router.push(`/add-transaction?id=${txId}`)}
          />
        }
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <TransactionDetail item={item} balanceAfter={balanceAfter} onPickReceipt={changeReceipt} />
      </ScrollView>
      <View style={{ paddingBottom: bottomInset + 8 }} className="flex-row gap-2 px-5 pt-2">
        <View className="flex-1">
          <Button label="Dupliquer" variant="soft" size="md" onPress={duplicate} />
        </View>
        <View className="flex-1">
          <Button label="Supprimer" size="md" onPress={confirmDelete} />
        </View>
      </View>
    </SafeAreaView>
  );
}
