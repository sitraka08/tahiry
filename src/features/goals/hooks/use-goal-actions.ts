import { addMonths } from 'date-fns';
import { eq } from 'drizzle-orm';

import { db, goalDeposits, goals } from '@/db';
import { parseAmount } from '@/lib/money';

import type { DepositFormValues, GoalFormValues } from '../schemas/goal-schema';

export function createGoal(values: GoalFormValues) {
  const now = Date.now();
  db.insert(goals)
    .values({
      name: values.name,
      target: parseAmount(values.target),
      dueDate: values.dueInMonths ? addMonths(now, values.dueInMonths).getTime() : null,
      accountId: values.accountId,
    })
    .run();
}

export function addDeposit(goalId: number, values: DepositFormValues) {
  db.insert(goalDeposits)
    .values({ goalId, amount: parseAmount(values.amount), date: Date.now() })
    .run();
}

export function deleteGoal(id: number) {
  db.delete(goals).where(eq(goals.id, id)).run();
}
