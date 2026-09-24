import { eq } from 'drizzle-orm';

import { accounts, db } from '@/db';
import { parseAmount } from '@/lib/money';

import type { AccountFormValues } from '../schemas/account-schema';
import { initialBalanceFor } from './initial-balance';

export function createAccount(values: AccountFormValues) {
  const last = db.select({ id: accounts.id }).from(accounts).all().length;
  db.insert(accounts)
    .values({
      type: values.type,
      name: values.name,
      detail: values.detail || null,
      initialBalance: parseAmount(values.balance),
      position: last,
    })
    .run();
}

type Current = { balance: number; initialBalance: number };

export function updateAccount(id: number, values: AccountFormValues, current: Current) {
  db.update(accounts)
    .set({
      type: values.type,
      name: values.name,
      detail: values.detail || null,
      initialBalance: initialBalanceFor(
        parseAmount(values.balance),
        current.balance,
        current.initialBalance,
      ),
    })
    .where(eq(accounts.id, id))
    .run();
}

export function archiveAccount(id: number) {
  db.update(accounts).set({ archived: true }).where(eq(accounts.id, id)).run();
}

export function markCounted(id: number) {
  db.update(accounts).set({ countedAt: Date.now() }).where(eq(accounts.id, id)).run();
}
