import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { and, between, eq, sql } from 'drizzle-orm';
import { useMemo, useState } from 'react';

import { budgets, categories, db, transactions, useLiveRows } from '@/db';
import { monthKey } from '@/lib/dates';

import type { CategoryInfo, LimitRow, SpendRow } from '../types';
import { buildBudgetView, limitsFor, overruns } from './budget-math';

function spendQuery(from: number, to: number) {
  return db
    .select({
      categoryId: transactions.categoryId,
      spent: sql<number>`SUM(${transactions.amount})`.mapWith(Number),
    })
    .from(transactions)
    .where(and(eq(transactions.type, 'out'), between(transactions.date, from, to)))
    .groupBy(transactions.categoryId);
}

export function useBudget() {
  const [now] = useState(Date.now);
  const month = monthKey(now);
  const prev = subMonths(now, 1);
  const prevMonth = monthKey(prev.getTime());

  const rows = useLiveRows(db.select().from(budgets), [budgets], []);
  const cats = useLiveRows(
    db
      .select({ id: categories.id, label: categories.label })
      .from(categories)
      .where(eq(categories.kind, 'out')),
    [categories],
    [],
  );
  const current = useLiveRows(
    spendQuery(startOfMonth(now).getTime(), endOfMonth(now).getTime()),
    [transactions],
    [month],
  );
  const previous = useLiveRows(
    spendQuery(startOfMonth(prev).getTime(), endOfMonth(prev).getTime()),
    [transactions],
    [prevMonth],
  );

  return useMemo(() => {
    const limitRows = rows as LimitRow[];
    const categoryList = cats as CategoryInfo[];
    const limits = limitsFor(limitRows, month);
    const view = buildBudgetView({
      limits,
      spend: current as SpendRow[],
      categories: categoryList,
      now,
    });
    const alerts = overruns({
      limits: limitsFor(limitRows, prevMonth),
      spend: previous as SpendRow[],
      categories: categoryList,
    });
    return {
      view,
      alerts,
      limits,
      categories: categoryList,
      monthLabel: format(now, 'MMMM', { locale: fr }),
      prevMonthLabel: format(prev, 'MMMM', { locale: fr }),
      hasBudget: view.total > 0,
    };
  }, [rows, cats, current, previous, month, prevMonth, now, prev]);
}
