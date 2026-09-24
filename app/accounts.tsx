import { Plus } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Headline, IconButton, ScreenHeader, type SheetMethods } from '@/components';
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
import { useAmountMask } from '@/lib/use-amount-mask';

export default function Accounts() {
  const { groups, total } = useAccounts();
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
        <View className="mx-5 mt-3.5">
          <Headline lead="Où est passé " highlight="mon argent" tail=" ?" />
        </View>
        <View className="mx-5 mt-4">
          <AccountsDonut groups={groups} total={total} />
        </View>

        {groups
          .filter((g) => g.accounts.length > 0)
          .map((g) => (
            <View key={g.type} className="mx-5 mt-[18px]">
              <View className="flex-row items-baseline justify-between">
                <AppText
                  weight="medium"
                  className="text-[13px] uppercase text-muted"
                  style={{ letterSpacing: 0.6 }}
                >
                  {g.label}
                </AppText>
                <AppText weight="bold" className="text-[13px]">
                  {fmt(g.total)}
                </AppText>
              </View>
              <View className="mt-2 gap-1.5">
                {g.accounts.map((a) => (
                  <AccountRow key={a.id} account={a} onPress={() => open(a)} />
                ))}
              </View>
            </View>
          ))}
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
