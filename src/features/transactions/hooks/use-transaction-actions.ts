import { eq } from 'drizzle-orm';

import { db, transactions } from '@/db';
import { parseAmount } from '@/lib/money';

import type { TransactionFormValues } from '../schemas/transaction-schema';

export function createTransaction(values: TransactionFormValues) {
  return db
    .insert(transactions)
    .values({
      type: values.type,
      amount: parseAmount(values.amount),
      accountId: values.accountId,
      toAccountId: values.type === 'transfer' ? values.toAccountId : null,
      categoryId: values.type === 'transfer' ? null : values.categoryId,
      note: values.note || null,
      date: values.date,
      recurring: values.recurring,
      createdAt: Date.now(),
    })
    .returning()
    .get();
}

export function updateTransaction(id: number, values: TransactionFormValues) {
  db.update(transactions)
    .set({
      type: values.type,
      amount: parseAmount(values.amount),
      accountId: values.accountId,
      toAccountId: values.type === 'transfer' ? values.toAccountId : null,
      categoryId: values.type === 'transfer' ? null : values.categoryId,
      note: values.note || null,
      date: values.date,
      recurring: values.recurring,
    })
    .where(eq(transactions.id, id))
    .run();
}

export function duplicateTransaction(id: number) {
  const source = db.select().from(transactions).where(eq(transactions.id, id)).get();
  if (!source) return null;
  const { id: _id, receiptUri: _receipt, ...rest } = source;
  const now = Date.now();
  return db
    .insert(transactions)
    .values({ ...rest, date: now, createdAt: now })
    .returning()
    .get();
}

export function deleteTransaction(id: number) {
  db.delete(transactions).where(eq(transactions.id, id)).run();
}

export function setReceipt(id: number, uri: string | null) {
  db.update(transactions).set({ receiptUri: uri }).where(eq(transactions.id, id)).run();
}
