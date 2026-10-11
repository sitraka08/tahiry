import { Plus, Repeat } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState, IconButton, ScreenHeader, Segmented, type SheetMethods } from '@/components';
import { useAccounts } from '@/features/accounts';
import {
  DebtCard,
  DebtSheet,
  DebtsSummary,
  PaymentSheet,
  addPayment,
  createDebt,
  deleteDebt,
  useDebts,
  type DebtFilter,
  type DebtItem,
} from '@/features/debts';
import { toast } from '@/lib/toast-store';

const FILTERS: { value: DebtFilter; label: string }[] = [
  { value: 'all', label: 'Tout' },
  { value: 'lent', label: 'On me doit' },
  { value: 'borrowed', label: 'Je dois' },
];

export default function Debts() {
  const { items, summary } = useDebts();
  const { accounts } = useAccounts();
  const [filter, setFilter] = useState<DebtFilter>('all');
  const [paying, setPaying] = useState<{ debt: DebtItem; full: boolean } | null>(null);
  const paymentRef = useRef<SheetMethods>(null);
  const debtRef = useRef<SheetMethods>(null);

  const options = accounts.map((a) => ({ id: a.id, name: a.name }));
  const visible = items.filter((d) => filter === 'all' || d.direction === filter);

  const openPayment = (debt: DebtItem, full: boolean) => {
    setPaying({ debt, full });
    requestAnimationFrame(() => paymentRef.current?.present());
  };

  const confirmDelete = (debt: DebtItem) =>
    Alert.alert(
      `Supprimer « ${debt.person} » ?`,
      'Les opérations déjà enregistrées sont conservées.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteDebt(debt.id) },
      ],
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="Dettes & prêts"
        right={
          <IconButton
            icon={Plus}
            label="Ajouter une dette ou un prêt"
            tone="accent"
            onPress={() => debtRef.current?.present()}
          />
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <DebtsSummary summary={summary} />
        <View className="mx-5 mt-3.5">
          <Segmented options={FILTERS} value={filter} onChange={setFilter} />
        </View>
        <View className="mx-5 mt-3.5 gap-2.5">
          {visible.map((debt) => (
            <DebtCard key={debt.id} debt={debt} onPay={openPayment} onLongPress={confirmDelete} />
          ))}
          {visible.length === 0 ? (
            <EmptyState
              icon={Repeat}
              title="Aucune dette ni aucun prêt"
              description="Note l’argent que tu prêtes ou que tu empruntes pour ne jamais l’oublier."
              actionLabel="Ajouter"
              onAction={() => debtRef.current?.present()}
            />
          ) : null}
        </View>
      </ScrollView>

      <PaymentSheet
        sheetRef={paymentRef}
        debt={paying?.debt ?? null}
        full={paying?.full ?? false}
        accounts={options}
        onSubmit={(debt, values) => {
          addPayment(debt, values);
          toast('Paiement enregistré');
          paymentRef.current?.dismiss();
        }}
      />
      <DebtSheet
        sheetRef={debtRef}
        accounts={options}
        onSubmit={(values) => {
          createDebt(values);
          toast('Ajouté à tes dettes et prêts');
          debtRef.current?.dismiss();
        }}
      />
    </SafeAreaView>
  );
}
