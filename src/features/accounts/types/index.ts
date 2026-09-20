import type { Account } from '@/db';

export type AccountType = Account['type'];

export type AccountWithBalance = Omit<Account, 'initialBalance'> & { balance: number };

export type AccountGroup = {
  type: AccountType;
  label: string;
  total: number;
  accounts: AccountWithBalance[];
};
