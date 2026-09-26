export type Repeat = 'none' | 'weekly' | 'monthly';
export type Tone = 'late' | 'soon' | 'later';
export type CashFrequency = 'day' | 'week' | 'never';

export type ReminderItem = {
  key: string;
  source: 'reminder' | 'debt';
  id: number;
  title: string;
  amount: number | null;
  accountId: number | null;
  accountName: string | null;
  dueDate: number;
  repeat: Repeat;
};

export type ReminderSummary = { total: number; count: number; lateCount: number };

export type AccountOption = { id: number; name: string };
