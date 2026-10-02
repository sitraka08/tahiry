import { desc, eq, sql } from 'drizzle-orm';
import { useMemo } from 'react';

import { accounts, db, goalDeposits, goals, useLiveRows } from '@/db';

import type { GoalItem } from '../types';
import { savedAccounts, totalSaved } from './goal-math';

export function useGoals() {
  const rows = useLiveRows(
    db
      .select({
        id: goals.id,
        name: goals.name,
        target: goals.target,
        saved:
          sql<number>`COALESCE((SELECT SUM(d.amount) FROM goal_deposits d WHERE d.goal_id = ${goals.id}), 0)`.mapWith(
            Number,
          ),
        dueDate: goals.dueDate,
        accountId: goals.accountId,
        accountName: accounts.name,
      })
      .from(goals)
      .leftJoin(accounts, eq(goals.accountId, accounts.id))
      .orderBy(desc(goals.id)),
    [goals, goalDeposits, accounts],
    [],
  );

  return useMemo(() => {
    const items = rows as GoalItem[];
    return { items, total: totalSaved(items), accountNames: savedAccounts(items) };
  }, [rows]);
}
