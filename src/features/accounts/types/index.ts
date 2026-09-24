import type { Account } from '@/db';

export type AccountType = Account['type'];

export type AccountWithBalance = Account & { balance: number; lastActivity: number | null };

export type AccountGroup = {
  type: AccountType;
  label: string;
  total: number;
  accounts: AccountWithBalance[];
};
