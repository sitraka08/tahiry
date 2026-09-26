import type { ReminderItem } from '../../types';
import { dueDateIn, dueStatus, nextDueDate, pendingCount, summarize } from '../reminder-math';

const NOW = new Date(2026, 9, 2, 10, 0).getTime();
const at = (month: number, day: number) => new Date(2026, month, day, 9, 0).getTime();

const item = (dueDate: number, amount: number | null = 1000): ReminderItem => ({
  key: String(dueDate),
  source: 'reminder',
  id: 1,
  title: 'x',
  amount,
  accountId: null,
  accountName: null,
  dueDate,
  repeat: 'none',
});

describe('reminder math', () => {
  it('labels the due status', () => {
    expect(dueStatus(at(8, 30), NOW)).toEqual({ label: 'En retard', tone: 'late' });
    expect(dueStatus(at(9, 2), NOW)).toEqual({ label: 'Aujourd’hui', tone: 'soon' });
    expect(dueStatus(at(9, 5), NOW)).toEqual({ label: 'Dans 3 j', tone: 'soon' });
    expect(dueStatus(at(9, 10), NOW)).toEqual({ label: 'Dans 8 j', tone: 'later' });
  });

  it('computes the next occurrence', () => {
    expect(nextDueDate(at(9, 5), 'weekly')).toBe(at(9, 12));
    expect(nextDueDate(at(9, 5), 'monthly')).toBe(at(10, 5));
    expect(nextDueDate(at(9, 5), 'none')).toBeNull();
  });

  it('builds a due date at 9:00', () => {
    expect(dueDateIn(1, NOW)).toBe(at(9, 3));
  });

  it('summarizes the next 30 days including late items', () => {
    const items = [item(at(8, 30), 28000), item(at(9, 5), 350000), item(at(11, 30), 5000)];
    expect(summarize(items, NOW)).toEqual({ total: 378000, count: 2, lateCount: 1 });
  });

  it('counts pending items', () => {
    expect(pendingCount([item(at(8, 30)), item(at(9, 4)), item(at(9, 20))], NOW)).toBe(2);
  });
});
