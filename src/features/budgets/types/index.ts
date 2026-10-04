export type LimitRow = { month: string; categoryId: number | null; amount: number };

export type CategoryInfo = { id: number; label: string };

export type SpendRow = { categoryId: number | null; spent: number };

export type BudgetLine = {
  key: string;
  categoryId: number | null;
  label: string;
  spent: number;
  limit: number;
  percent: number;
  over: boolean;
};

export type BudgetView = {
  total: number;
  spent: number;
  remaining: number;
  percent: number;
  perDay: number;
  day: number;
  days: number;
  lines: BudgetLine[];
};
