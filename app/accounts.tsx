import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, IconButton, ScreenHeader, type SheetMethods } from '@/components';
import {
  AccountRow,
  AccountSheet,
  AccountsDonut,
  archiveAccount,
  createAccount,
  updateAccount,
  useAccounts,
  type AccountWithBalance,
} from '@/features/accounts';
import { CashGapAlert, useCashGap } from '@/features/cash-count';
import { useAmountMask } from '@/lib/use-amount-mask';
import { toast } from '@/lib/toast-store';

export default function Accounts() {
  const router = useRouter();
  const { accounts, groups, total } = useAccounts();
  const cashGap = useCashGap();
  const gapAccount = cashGap ? accounts.find((a) => a.id === cashGap.accountId) : undefined;
  const missing = cashGap && gapAccount ? gapAccount.balance - cashGap.counted : 0;
  const fmt = useAmountMask();
  const sheetRef = useRef<SheetMethods>(null);
  const [editing, setEditing] = useState<AccountWithBalance | null>(null);

  const open = (account: AccountWithBalance | null) => {
    setEditing(account);
    requestAnimationFrame(() => sheetRef.current?.present());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="Mes comptes"
        right={
          <IconButton
            icon={Plus}
            label="Ajouter un compte"
            tone="accent"
            onPress={() => open(null)}
          />
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 mt-4">
          <AccountsDonut groups={groups} total={total} />
        </View>

        {groups
          .filter((g) => g.accounts.length > 0)
          .map((g) => (
            <View key={g.type} className="mt-5">
              <View className="flex-row items-baseline justify-between px-4 pb-1">
                <AppText
                  variant="caption"
                  weight="bold"
                  tone="muted"
                  className="uppercase"
                  style={{ letterSpacing: 0.6 }}
                >
                  {g.label}
                </AppText>
                <AppText variant="caption" weight="bold">
                  {fmt(g.total)}
                </AppText>
              </View>
              <View>
                {g.accounts.map((a) => (
                  <AccountRow key={a.id} account={a} onPress={() => open(a)} />
                ))}
              </View>
            </View>
          ))}
        {cashGap && gapAccount && missing > 0 ? (
          <CashGapAlert
            missing={missing}
            counted={cashGap.counted}
            expected={gapAccount.balance}
            onAddExpense={() => router.push('/add-transaction')}
            onRecount={() => router.push('/cash-count')}
          />
        ) : null}
      </ScrollView>

      <AccountSheet
        sheetRef={sheetRef}
        account={editing}
        onSubmit={(values) => {
          if (editing) {
            updateAccount(editing.id, values, {
              balance: editing.balance,
              initialBalance: editing.initialBalance,
            });
          } else {
            createAccount(values);
          }
          toast(editing ? 'Compte mis à jour' : 'Compte ajouté');
          sheetRef.current?.dismiss();
        }}
        onArchive={() => {
          if (editing) archiveAccount(editing.id);
          sheetRef.current?.dismiss();
        }}
      />
    </SafeAreaView>
  );
}
