export type TransactionType = 'out' | 'in' | 'transfer';

export type TransactionItem = {
  id: number;
  type: TransactionType;
  amount: number;
  note: string | null;
  date: number;
  receiptUri: string | null;
  accountId: number;
  toAccountId: number | null;
  categoryId: number | null;
  accountName: string;
  categoryLabel: string | null;
};

export type TransactionFilter = {
  type?: TransactionType;
  search?: string;
  limit?: number;
};

export type DayGroup = { key: string; label: string; items: TransactionItem[] };
