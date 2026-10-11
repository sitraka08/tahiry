import { getTableColumns } from 'drizzle-orm';
import { getTableConfig, type SQLiteTable } from 'drizzle-orm/sqlite-core';

import {
  accounts,
  budgets,
  categories,
  debtPayments,
  debts,
  goalDeposits,
  goals,
  reminders,
  settings,
  transactions,
} from '@/db';

export const LOCAL_ONLY_SETTINGS = ['pinEnabled', 'biometric', 'cashCountNotificationId'];

export const TABLES: SQLiteTable[] = [
  categories,
  accounts,
  transactions,
  debts,
  debtPayments,
  goals,
  goalDeposits,
  budgets,
  reminders,
  settings,
];

export const tableName = (table: SQLiteTable) => getTableConfig(table).name;

export const allowedColumns = () =>
  Object.fromEntries(TABLES.map((t) => [tableName(t), Object.keys(getTableColumns(t))]));
