import { and, eq } from 'drizzle-orm';

import { categories, db, reminders, transactions } from '@/db';
import { cancelNotification, scheduleAt } from '@/lib/notifications';
import { parseAmount } from '@/lib/money';

import type { ReminderFormValues } from '../schemas/reminder-schema';
import type { ReminderItem } from '../types';
import { dueDateIn, nextDueDate } from './reminder-math';

const body = (title: string, amount: number | null) =>
  amount ? `${title} · ${amount.toLocaleString('fr-FR')} Ar` : title;

export async function createReminder(values: ReminderFormValues) {
  const amount = parseAmount(values.amount) || null;
  const dueDate = dueDateIn(values.dueInDays, Date.now());
  const row = db
    .insert(reminders)
    .values({
      title: values.title,
      amount,
      accountId: values.accountId,
      dueDate,
      repeat: values.repeat,
    })
    .returning()
    .get();
  const notificationId = await scheduleAt(dueDate, 'Rappel', body(values.title, amount));
  if (notificationId) {
    db.update(reminders).set({ notificationId }).where(eq(reminders.id, row.id)).run();
  }
}

export async function markReminderPaid(item: ReminderItem) {
  const row = db.select().from(reminders).where(eq(reminders.id, item.id)).get();
  if (!row) return;

  if (row.amount && row.accountId) {
    const category = db
      .select({ id: categories.id })
      .from(categories)
      .where(and(eq(categories.kind, 'out'), eq(categories.key, 'bills')))
      .get();
    const now = Date.now();
    db.insert(transactions)
      .values({
        type: 'out',
        amount: row.amount,
        accountId: row.accountId,
        categoryId: category?.id ?? null,
        note: row.title,
        date: now,
        createdAt: now,
      })
      .run();
  }

  await cancelNotification(row.notificationId);
  const next = nextDueDate(row.dueDate, row.repeat);
  if (!next) {
    db.update(reminders)
      .set({ done: true, notificationId: null })
      .where(eq(reminders.id, row.id))
      .run();
    return;
  }
  const notificationId = await scheduleAt(next, 'Rappel', body(row.title, row.amount));
  db.update(reminders).set({ dueDate: next, notificationId }).where(eq(reminders.id, row.id)).run();
}

export async function deleteReminder(id: number) {
  const row = db.select().from(reminders).where(eq(reminders.id, id)).get();
  await cancelNotification(row?.notificationId);
  db.delete(reminders).where(eq(reminders.id, id)).run();
}
