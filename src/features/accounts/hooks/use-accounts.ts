import { asc, eq, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useMemo } from 'react';

import { accounts, db } from '@/db';

import type { AccountGroup, AccountType, AccountWithBalance } from '../types';

const balanceSql = sql<number>`${accounts.initialBalance}
  + COALESCE((SELECT SUM(CASE t.type WHEN 'in' THEN t.amount ELSE -t.amount END)
      FROM transactions t WHERE t.account_id = ${accounts.id}), 0)
  + COALESCE((SELECT SUM(t.amount)
      FROM transactions t WHERE t.type = 'transfer' AND t.to_account_id = ${accounts.id}), 0)`;

const GROUPS: { type: AccountType; label: string }[] = [
  { type: 'bank', label: 'Banques' },
  { type: 'mobile', label: 'Mobile Money' },
  { type: 'cash', label: 'Espèces' },
  { type: 'group', label: 'Épargne de groupe' },
];

export function useAccounts() {
  const { data } = useLiveQuery(
    db
      .select({
        id: accounts.id,
        type: accounts.type,
        name: accounts.name,
        detail: accounts.detail,
        position: accounts.position,
        countedAt: accounts.countedAt,
        archived: accounts.archived,
        balance: balanceSql.mapWith(Number),
      })
      .from(accounts)
      .where(eq(accounts.archived, false))
      .orderBy(asc(accounts.position), asc(accounts.id)),
  );

  return useMemo(() => {
    const list: AccountWithBalance[] = data;
    const total = list.reduce((sum, a) => sum + a.balance, 0);
    const groups: AccountGroup[] = GROUPS.map((g) => {
      const items = list.filter((a) => a.type === g.type);
      return { ...g, accounts: items, total: items.reduce((s, a) => s + a.balance, 0) };
    });
    return { accounts: list, groups, total };
  }, [data]);
}
