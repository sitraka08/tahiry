import { and, asc, eq, isNotNull, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useMemo, useState } from 'react';

import { accounts, db, debts, reminders } from '@/db';

import type { ReminderItem } from '../types';
import { pendingCount, summarize } from './reminder-math';

export function useReminders() {
  const [now] = useState(Date.now);

  const { data: own } = useLiveQuery(
    db
      .select({
        id: reminders.id,
        title: reminders.title,
        amount: reminders.amount,
        accountId: reminders.accountId,
        accountName: accounts.name,
        dueDate: reminders.dueDate,
        repeat: reminders.repeat,
      })
      .from(reminders)
      .leftJoin(accounts, eq(reminders.accountId, accounts.id))
      .where(eq(reminders.done, false)),
  );

  const { data: owed } = useLiveQuery(
    db
      .select({
        id: debts.id,
        person: debts.person,
        direction: debts.direction,
        remaining:
          sql<number>`${debts.amount} - COALESCE((SELECT SUM(p.amount) FROM debt_payments p WHERE p.debt_id = ${debts.id}), 0)`.mapWith(
            Number,
          ),
        accountId: debts.accountId,
        accountName: accounts.name,
        dueDate: debts.dueDate,
      })
      .from(debts)
      .leftJoin(accounts, eq(debts.accountId, accounts.id))
      .where(and(eq(debts.settled, false), isNotNull(debts.dueDate)))
      .orderBy(asc(debts.dueDate)),
  );

  return useMemo(() => {
    const items: ReminderItem[] = [
      ...own.map((r) => ({
        key: `reminder-${r.id}`,
        source: 'reminder' as const,
        ...r,
      })),
      ...owed.map((d) => ({
        key: `debt-${d.id}`,
        source: 'debt' as const,
        id: d.id,
        title:
          d.direction === 'borrowed' ? `Rembourser ${d.person}` : `${d.person} doit rembourser`,
        amount: d.remaining,
        accountId: d.accountId,
        accountName: d.accountName,
        dueDate: d.dueDate ?? 0,
        repeat: 'none' as const,
      })),
    ].sort((a, b) => a.dueDate - b.dueDate);

    return {
      items,
      summary: summarize(items, now),
      pending: pendingCount(items, now),
      now,
    };
  }, [own, owed, now]);
}
