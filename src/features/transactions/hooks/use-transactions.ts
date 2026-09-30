import { and, desc, eq, like, or, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useMemo } from 'react';

import { accounts, categories, db, transactions, useLiveRows } from '@/db';
import { formatDayLabel, startOfDayKey } from '@/lib/dates';

import type { DayGroup, TransactionFilter, TransactionItem } from '../types';

const toAccount = alias(accounts, 'to_account');

function selectTransactions() {
  return db
    .select({
      id: transactions.id,
      type: transactions.type,
      amount: transactions.amount,
      note: transactions.note,
      date: transactions.date,
      receiptUri: transactions.receiptUri,
      accountId: transactions.accountId,
      toAccountId: transactions.toAccountId,
      categoryId: transactions.categoryId,
      accountName: accounts.name,
      toAccountName: toAccount.name,
      categoryLabel: categories.label,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(toAccount, eq(transactions.toAccountId, toAccount.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .$dynamic();
}

export function useTransactions(filter: TransactionFilter = {}) {
  const { type, accountId, search, limit } = filter;
  const term = search?.trim();

  const conditions = [
    type ? eq(transactions.type, type) : undefined,
    accountId != null
      ? or(eq(transactions.accountId, accountId), eq(transactions.toAccountId, accountId))
      : undefined,
    term
      ? or(
          like(transactions.note, `%${term}%`),
          like(categories.label, `%${term}%`),
          like(accounts.name, `%${term}%`),
        )
      : undefined,
  ].filter(Boolean);

  let query = selectTransactions()
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(transactions.date), desc(transactions.id));
  if (limit) query = query.limit(limit);

  const data = useLiveRows(
    query,
    [transactions, accounts, categories],
    [type, accountId, term, limit],
  );

  const groups = useMemo(() => {
    const map = new Map<string, DayGroup>();
    (data as TransactionItem[]).forEach((item) => {
      const key = startOfDayKey(item.date);
      const group = map.get(key) ?? { key, label: formatDayLabel(item.date), items: [] };
      group.items.push(item);
      map.set(key, group);
    });
    return [...map.values()];
  }, [data]);

  return { items: data as TransactionItem[], groups };
}

export function useTransaction(id: number) {
  const data = useLiveRows(
    selectTransactions().where(eq(transactions.id, id)),
    [transactions, accounts, categories],
    [id],
  );
  return (data[0] as TransactionItem | undefined) ?? null;
}

export function useMonthTotals(from: number, to: number) {
  const { data } = useLiveQuery(
    db
      .select({
        type: transactions.type,
        total: sql<number>`SUM(${transactions.amount})`.mapWith(Number),
      })
      .from(transactions)
      .where(and(sql`${transactions.date} >= ${from}`, sql`${transactions.date} < ${to}`))
      .groupBy(transactions.type),
    [from, to],
  );
  const get = (t: string) => data.find((r) => r.type === t)?.total ?? 0;
  return { income: get('in'), expense: get('out') };
}
