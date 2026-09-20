import { and, desc, eq, like, or, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useMemo } from 'react';

import { accounts, categories, db, transactions } from '@/db';
import { formatDayLabel, startOfDayKey } from '@/lib/dates';

import type { DayGroup, TransactionFilter, TransactionItem } from '../types';

export function useTransactions(filter: TransactionFilter = {}) {
  const { type, search, limit } = filter;
  const term = search?.trim();

  const conditions = [
    type ? eq(transactions.type, type) : undefined,
    term
      ? or(
          like(transactions.note, `%${term}%`),
          like(categories.label, `%${term}%`),
          like(accounts.name, `%${term}%`),
        )
      : undefined,
  ].filter(Boolean);

  let query = db
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
      categoryLabel: categories.label,
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(transactions.date), desc(transactions.id))
    .$dynamic();
  if (limit) query = query.limit(limit);

  const { data } = useLiveQuery(query, [type, term, limit]);

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
  const { data } = useLiveQuery(
    db
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
        categoryLabel: categories.label,
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(eq(transactions.id, id)),
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
