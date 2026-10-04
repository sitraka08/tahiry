import { getDate, getDaysInMonth } from 'date-fns';

import type { BudgetLine, BudgetView, CategoryInfo, LimitRow, SpendRow } from '../types';

export const OTHER_LABEL = 'Autres motifs';

export function limitsFor(rows: LimitRow[], month: string) {
  const latest = new Map<number | null, LimitRow>();
  rows
    .filter((r) => r.month <= month)
    .forEach((r) => {
      const current = latest.get(r.categoryId);
      if (!current || r.month > current.month) latest.set(r.categoryId, r);
    });
  return new Map([...latest.entries()].map(([id, row]) => [id, row.amount]));
}

export function perDayOf(remaining: number, day: number, days: number) {
  return Math.max(Math.round(remaining / Math.max(days - day, 1)), 0);
}

const percentOf = (spent: number, limit: number) =>
  limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;

export function buildBudgetView(args: {
  limits: Map<number | null, number>;
  spend: SpendRow[];
  categories: CategoryInfo[];
  now: number;
}): BudgetView {
  const { limits, spend, categories, now } = args;
  const spentOf = (id: number | null) =>
    spend.filter((s) => s.categoryId === id).reduce((sum, s) => sum + s.spent, 0);

  const limitedIds = categories.filter((c) => (limits.get(c.id) ?? 0) > 0).map((c) => c.id);
  const lines: BudgetLine[] = categories
    .filter((c) => limitedIds.includes(c.id))
    .map((c) => {
      const limit = limits.get(c.id) ?? 0;
      const spent = spentOf(c.id);
      return {
        key: String(c.id),
        categoryId: c.id,
        label: c.label,
        spent,
        limit,
        percent: percentOf(spent, limit),
        over: spent > limit,
      };
    });

  const totalSpent = spend.reduce((sum, s) => sum + s.spent, 0);
  const total = limits.get(null) ?? lines.reduce((sum, l) => sum + l.limit, 0);
  const limitedTotal = lines.reduce((sum, l) => sum + l.limit, 0);
  const otherSpent = totalSpent - lines.reduce((sum, l) => sum + l.spent, 0);
  const otherLimit = Math.max(total - limitedTotal, 0);
  if (otherLimit > 0 || otherSpent > 0) {
    lines.push({
      key: 'other',
      categoryId: null,
      label: OTHER_LABEL,
      spent: otherSpent,
      limit: otherLimit,
      percent: percentOf(otherSpent, otherLimit),
      over: otherSpent > otherLimit,
    });
  }

  const day = getDate(now);
  const days = getDaysInMonth(now);
  const remaining = total - totalSpent;

  return {
    total,
    spent: totalSpent,
    remaining,
    percent: percentOf(totalSpent, total),
    perDay: perDayOf(remaining, day, days),
    day,
    days,
    lines,
  };
}

export function overruns(args: {
  limits: Map<number | null, number>;
  spend: SpendRow[];
  categories: CategoryInfo[];
}) {
  const { limits, spend, categories } = args;
  return categories
    .filter((c) => {
      const limit = limits.get(c.id) ?? 0;
      const spent = spend.filter((s) => s.categoryId === c.id).reduce((sum, s) => sum + s.spent, 0);
      return limit > 0 && spent > limit;
    })
    .map((c) => ({
      label: c.label,
      excess:
        spend.filter((s) => s.categoryId === c.id).reduce((sum, s) => sum + s.spent, 0) -
        (limits.get(c.id) ?? 0),
    }));
}
