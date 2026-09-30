import { eq, sql } from 'drizzle-orm';

import { accounts, db, transactions, useLiveRows } from '@/db';

export function useBalanceAfter(accountId: number, date: number, id: number) {
  const upTo = sql`(t.date < ${date} OR (t.date = ${date} AND t.id <= ${id}))`;
  const data = useLiveRows(
    db
      .select({
        value: sql<number>`${accounts.initialBalance}
          + COALESCE((SELECT SUM(CASE t.type WHEN 'in' THEN t.amount ELSE -t.amount END)
              FROM transactions t WHERE t.account_id = ${accountId} AND ${upTo}), 0)
          + COALESCE((SELECT SUM(t.amount)
              FROM transactions t
              WHERE t.type = 'transfer' AND t.to_account_id = ${accountId} AND ${upTo}), 0)`.mapWith(
          Number,
        ),
      })
      .from(accounts)
      .where(eq(accounts.id, accountId)),
    [accounts, transactions],
    [accountId, date, id],
  );
  return data[0]?.value ?? 0;
}
