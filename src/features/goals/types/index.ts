export type GoalItem = {
  id: number;
  name: string;
  target: number;
  saved: number;
  dueDate: number | null;
  accountId: number | null;
  accountName: string | null;
};

export type AccountOption = { id: number; name: string };
