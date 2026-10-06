import { sqlite } from '@/db';

import { removePin } from './pin-store';

const TABLES = [
  'debt_payments',
  'debts',
  'goal_deposits',
  'goals',
  'budgets',
  'reminders',
  'transactions',
  'accounts',
  'settings',
];

export async function resetAllData() {
  await removePin();
  sqlite.withTransactionSync(() => {
    TABLES.forEach((table) => sqlite.execSync(`DELETE FROM ${table}`));
  });
}
