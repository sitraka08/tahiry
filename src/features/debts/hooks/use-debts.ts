import { desc, eq, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useMemo } from 'react';

import { accounts, db, debts } from '@/db';

import type { DebtItem } from '../types';
import { summarizeDebts } from './debt-math';

export function useDebts() {
  const { data } = useLiveQuery(
    db
      .select({
        id: debts.id,
        direction: debts.direction,
        person: debts.person,
        amount: debts.amount,
        paid: sql<number>`COALESCE((SELECT SUM(p.amount) FROM debt_payments p WHERE p.debt_id = ${debts.id}), 0)`.mapWith(
          Number,
        ),
        accountId: debts.accountId,
        accountName: accounts.name,
        date: debts.date,
        dueDate: debts.dueDate,
        settled: debts.settled,
      })
      .from(debts)
      .leftJoin(accounts, eq(debts.accountId, accounts.id))
      .orderBy(debts.settled, desc(debts.date)),
  );

  return useMemo(() => {
    const items = data as DebtItem[];
    return { items, summary: summarizeDebts(items) };
  }, [data]);
}
