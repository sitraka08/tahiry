import { and, eq } from 'drizzle-orm';

import { categories, db, transactions } from '@/db';

export function recordForgottenExpense(accountId: number, amount: number) {
  const category = db
    .select({ id: categories.id })
    .from(categories)
    .where(and(eq(categories.kind, 'out'), eq(categories.key, 'other')))
    .get();
  const now = Date.now();
  db.insert(transactions)
    .values({
      type: 'out',
      amount,
      accountId,
      categoryId: category?.id ?? null,
      note: 'Dépense non enregistrée',
      date: now,
      createdAt: now,
    })
    .run();
}
