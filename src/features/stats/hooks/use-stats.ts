import { and, asc, eq, gte, lt, ne, sql } from 'drizzle-orm';
import { useMemo, useState } from 'react';

import { accounts, categories, db, transactions, useLiveRows } from '@/db';

import type { Period, StatRow } from '../types';
import { buildStats, periodRange } from './stats-math';

export function useStats(period: Period) {
  const [now] = useState(Date.now);
  const { from } = periodRange(period, now);

  const initial = useLiveRows(
    db
      .select({ value: sql<number>`COALESCE(SUM(${accounts.initialBalance}), 0)`.mapWith(Number) })
      .from(accounts)
      .where(eq(accounts.archived, false)),
    [accounts],
    [],
  );

  const before = useLiveRows(
    db
      .select({
        value:
          sql<number>`COALESCE(SUM(CASE ${transactions.type} WHEN 'in' THEN ${transactions.amount} WHEN 'out' THEN -${transactions.amount} ELSE 0 END), 0)`.mapWith(
            Number,
          ),
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .where(and(eq(accounts.archived, false), lt(transactions.date, from))),
    [transactions, accounts],
    [from],
  );

  const rows = useLiveRows(
    db
      .select({
        type: transactions.type,
        amount: transactions.amount,
        date: transactions.date,
        label: categories.label,
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(
        and(
          eq(accounts.archived, false),
          ne(transactions.type, 'transfer'),
          gte(transactions.date, from),
        ),
      )
      .orderBy(asc(transactions.date)),
    [transactions, accounts, categories],
    [from],
  );

  return useMemo(
    () =>
      buildStats(
        {
          initialTotal: initial[0]?.value ?? 0,
          netBefore: before[0]?.value ?? 0,
          rows: rows as StatRow[],
        },
        period,
        now,
      ),
    [initial, before, rows, period, now],
  );
}
