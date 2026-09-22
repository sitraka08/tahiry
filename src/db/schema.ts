import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const accounts = sqliteTable('accounts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type', { enum: ['bank', 'mobile', 'cash', 'group'] }).notNull(),
  name: text('name').notNull(),
  detail: text('detail'),
  initialBalance: integer('initial_balance').notNull().default(0),
  position: integer('position').notNull().default(0),
  countedAt: integer('counted_at'),
  archived: integer('archived', { mode: 'boolean' }).notNull().default(false),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  kind: text('kind', { enum: ['out', 'in'] }).notNull(),
  key: text('key'),
  label: text('label').notNull(),
  position: integer('position').notNull().default(0),
});

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type', { enum: ['out', 'in', 'transfer'] }).notNull(),
  amount: integer('amount').notNull(),
  accountId: integer('account_id')
    .notNull()
    .references(() => accounts.id),
  toAccountId: integer('to_account_id').references(() => accounts.id),
  categoryId: integer('category_id').references(() => categories.id),
  note: text('note'),
  receiptUri: text('receipt_uri'),
  date: integer('date').notNull(),
  recurring: integer('recurring', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at').notNull(),
});

export const debts = sqliteTable('debts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  direction: text('direction', { enum: ['lent', 'borrowed'] }).notNull(),
  person: text('person').notNull(),
  amount: integer('amount').notNull(),
  accountId: integer('account_id').references(() => accounts.id),
  date: integer('date').notNull(),
  dueDate: integer('due_date'),
  settled: integer('settled', { mode: 'boolean' }).notNull().default(false),
});

export const debtPayments = sqliteTable('debt_payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  debtId: integer('debt_id')
    .notNull()
    .references(() => debts.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  date: integer('date').notNull(),
});

export const goals = sqliteTable('goals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  target: integer('target').notNull(),
  dueDate: integer('due_date'),
  accountId: integer('account_id').references(() => accounts.id),
});

export const goalDeposits = sqliteTable('goal_deposits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  goalId: integer('goal_id')
    .notNull()
    .references(() => goals.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  date: integer('date').notNull(),
});

export const budgets = sqliteTable('budgets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  month: text('month').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  amount: integer('amount').notNull(),
});

export const reminders = sqliteTable('reminders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  amount: integer('amount'),
  accountId: integer('account_id').references(() => accounts.id),
  dueDate: integer('due_date').notNull(),
  repeat: text('repeat', { enum: ['none', 'weekly', 'monthly'] })
    .notNull()
    .default('none'),
  done: integer('done', { mode: 'boolean' }).notNull().default(false),
  notificationId: text('notification_id'),
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type Debt = typeof debts.$inferSelect;
export type DebtPayment = typeof debtPayments.$inferSelect;
export type Goal = typeof goals.$inferSelect;
export type GoalDeposit = typeof goalDeposits.$inferSelect;
export type Budget = typeof budgets.$inferSelect;
export type Reminder = typeof reminders.$inferSelect;
