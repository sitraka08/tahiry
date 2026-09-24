import { and, eq, sql } from 'drizzle-orm';

import { categories, db, debtPayments, debts, sqlite, transactions } from '@/db';
import { parseAmount } from '@/lib/money';

import type { DebtDirection } from '../types';
import type { DebtFormValues, PaymentFormValues } from '../schemas/debt-schema';

const DAY = 86_400_000;

function categoryId(kind: 'in' | 'out', key: string) {
  return (
    db
      .select({ id: categories.id })
      .from(categories)
      .where(and(eq(categories.kind, kind), eq(categories.key, key)))
      .get()?.id ?? null
  );
}

function record(args: {
  type: 'in' | 'out';
  amount: number;
  accountId: number;
  key: string;
  note: string;
}) {
  const now = Date.now();
  db.insert(transactions)
    .values({
      type: args.type,
      amount: args.amount,
      accountId: args.accountId,
      categoryId: categoryId(args.type, args.key),
      note: args.note,
      date: now,
      createdAt: now,
    })
    .run();
}

export function createDebt(values: DebtFormValues) {
  const amount = parseAmount(values.amount);
  const now = Date.now();
  const lent = values.direction === 'lent';
  sqlite.withTransactionSync(() => {
    db.insert(debts)
      .values({
        direction: values.direction,
        person: values.person,
        amount,
        accountId: values.accountId,
        date: now,
        dueDate: values.dueInDays ? now + values.dueInDays * DAY : null,
      })
      .run();
    record({
      type: lent ? 'out' : 'in',
      amount,
      accountId: values.accountId,
      key: 'other',
      note: lent ? `Prêt à ${values.person}` : `Emprunt à ${values.person}`,
    });
  });
}

export function addPayment(
  debt: { id: number; direction: DebtDirection; person: string; amount: number },
  values: PaymentFormValues,
) {
  const amount = parseAmount(values.amount);
  const lent = debt.direction === 'lent';
  sqlite.withTransactionSync(() => {
    db.insert(debtPayments).values({ debtId: debt.id, amount, date: Date.now() }).run();
    record({
      type: lent ? 'in' : 'out',
      amount,
      accountId: values.accountId,
      key: lent ? 'refund' : 'debt',
      note: lent ? `Remboursement de ${debt.person}` : `Remboursement à ${debt.person}`,
    });
    const paid = db
      .select({ total: sql<number>`COALESCE(SUM(${debtPayments.amount}), 0)`.mapWith(Number) })
      .from(debtPayments)
      .where(eq(debtPayments.debtId, debt.id))
      .get()?.total;
    if ((paid ?? 0) >= debt.amount) {
      db.update(debts).set({ settled: true }).where(eq(debts.id, debt.id)).run();
    }
  });
}

export function deleteDebt(id: number) {
  db.delete(debts).where(eq(debts.id, id)).run();
}
