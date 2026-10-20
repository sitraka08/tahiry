import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, Chip, ScreenHeader } from '@/components';
import { markCounted, setAccountBalance, useAccounts } from '@/features/accounts';
import {
  CountRow,
  CountSummary,
  DENOMINATIONS,
  adjustCount,
  clearCashGap,
  emptyCounts,
  gapOf,
  recordForgottenExpense,
  saveCashGap,
  totalOf,
} from '@/features/cash-count';
import { success } from '@/lib/haptics';
import { formatNumber } from '@/lib/money';
import { useBottomInset } from '@/lib/use-bottom-inset';
import { toast } from '@/lib/toast-store';

export default function CashCount() {
  const router = useRouter();
  const bottomInset = useBottomInset(16);
  const { accounts } = useAccounts();
  const cashAccounts = accounts.filter((a) => a.type === 'cash');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const account = cashAccounts.find((a) => a.id === selectedId) ?? cashAccounts[0];
  const [counts, setCounts] = useState(emptyCounts);

  const counted = totalOf(counts);
  const expected = account?.balance ?? 0;
  const gap = gapOf(counted, expected);

  const resolved = useRef(false);
  const latest = useRef({ accountId: account?.id, counted, gap });
  useEffect(() => {
    latest.current = { accountId: account?.id, counted, gap };
  });
  useEffect(
    () => () => {
      const { accountId, counted: last, gap: lastGap } = latest.current;
      if (!resolved.current && accountId && last > 0 && lastGap !== 0) {
        saveCashGap({ accountId, counted: last, at: Date.now() });
      }
    },
    [],
  );

  const finish = () => {
    resolved.current = true;
    clearCashGap();
    success();
    toast('Comptage enregistré');
    router.back();
  };

  if (!account) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenHeader title="Compter mes espèces" />
        <AppText className="mx-4 mt-10 text-center text-muted">
          Ajoute un compte « Espèces » pour pouvoir compter ton portefeuille.
        </AppText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title="Compter mes espèces" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 160 + bottomInset }}
        showsVerticalScrollIndicator={false}
      >
        {cashAccounts.length > 1 ? (
          <View className="mx-4 mt-3.5 flex-row flex-wrap gap-1.5">
            {cashAccounts.map((a) => (
              <Chip
                key={a.id}
                label={a.name}
                selected={a.id === account.id}
                onPress={() => setSelectedId(a.id)}
              />
            ))}
          </View>
        ) : null}
        <CountSummary counted={counted} expected={expected} />
        <AppText className="mx-4 mt-4 text-sm text-muted">
          Compte tes billets et pièces, l’app fait le calcul.
        </AppText>
        <View className="mx-4 mt-2.5 gap-1.5">
          {DENOMINATIONS.map((value) => (
            <CountRow
              key={value}
              value={value}
              count={counts[value] ?? 0}
              onChange={(delta) => setCounts((c) => adjustCount(c, value, delta))}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{ paddingBottom: bottomInset + 8 }}
        className="absolute inset-x-0 bottom-0 gap-2 bg-bg px-4 pt-2"
      >
        {gap < 0 && counted > 0 ? (
          <Button
            label="Ajouter la dépense oubliée"
            size="md"
            onPress={() => {
              recordForgottenExpense(account.id, -gap);
              markCounted(account.id);
              finish();
            }}
          />
        ) : null}
        <Button
          label={`Mettre le solde à ${formatNumber(counted)} Ar`}
          variant="accent"
          size="md"
          disabled={counted === 0}
          onPress={() => {
            setAccountBalance(account, counted);
            finish();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
