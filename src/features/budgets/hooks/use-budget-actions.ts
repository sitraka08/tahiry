import { eq } from 'drizzle-orm';

import { budgets, db, sqlite } from '@/db';
import { monthKey } from '@/lib/dates';
import { parseAmount } from '@/lib/money';

import type { BudgetFormValues } from '../schemas/budget-schema';

export function saveBudget(values: BudgetFormValues) {
  const month = monthKey(Date.now());
  sqlite.withTransactionSync(() => {
    db.delete(budgets).where(eq(budgets.month, month)).run();
    db.insert(budgets)
      .values({ month, categoryId: null, amount: parseAmount(values.total) })
      .run();
    Object.entries(values.limits).forEach(([id, amount]) => {
      const value = parseAmount(amount);
      if (value > 0) {
        db.insert(budgets)
          .values({ month, categoryId: Number(id), amount: value })
          .run();
      }
    });
  });
}
