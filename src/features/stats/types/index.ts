export type Period = 'week' | 'month' | 'year';

export type StatRow = {
  type: 'in' | 'out';
  amount: number;
  date: number;
  label: string | null;
};

export type CategoryShare = { label: string; total: number; percent: number; share: number };

export type StatsData = {
  income: number;
  expense: number;
  saved: number;
  labels: string[];
  values: number[];
  change: number | null;
  categories: CategoryShare[];
};

export type StatsInput = {
  initialTotal: number;
  netBefore: number;
  rows: StatRow[];
};
