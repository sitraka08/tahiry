export type DebtDirection = 'lent' | 'borrowed';

export type DebtItem = {
  id: number;
  direction: DebtDirection;
  person: string;
  amount: number;
  paid: number;
  accountId: number | null;
  accountName: string | null;
  date: number;
  dueDate: number | null;
  settled: boolean;
};

export type DebtFilter = 'all' | DebtDirection;

export type DebtSummary = {
  owedToMe: number;
  owedToMeCount: number;
  iOwe: number;
  iOweCount: number;
};

export type AccountOption = { id: number; name: string };
