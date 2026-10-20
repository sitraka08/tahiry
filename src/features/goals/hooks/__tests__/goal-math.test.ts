import type { GoalItem } from '../../types';
import {
  dueLabel,
  highlightGoal,
  monthlyNeeded,
  percentOf,
  savedAccounts,
  totalSaved,
} from '../goal-math';

const NOW = new Date(2026, 9, 9).getTime();

const goal = (over: Partial<GoalItem> = {}): GoalItem => ({
  id: 1,
  name: 'Fonds d’urgence',
  target: 1000000,
  saved: 420000,
  dueDate: new Date(2027, 2, 15).getTime(),
  accountId: 2,
  accountName: 'Banque 2',
  ...over,
});

describe('goal math', () => {
  it('computes the percentage and caps it at 100', () => {
    expect(percentOf(goal())).toBe(42);
    expect(percentOf(goal({ saved: 2000000 }))).toBe(100);
    expect(percentOf(goal({ target: 0 }))).toBe(0);
  });

  it('computes the monthly amount needed', () => {
    expect(monthlyNeeded(goal(), NOW)).toBe(Math.ceil(580000 / 5));
  });

  it('returns null without a due date or when the goal is reached', () => {
    expect(monthlyNeeded(goal({ dueDate: null }), NOW)).toBeNull();
    expect(monthlyNeeded(goal({ saved: 1000000 }), NOW)).toBeNull();
  });

  it('needs at least one month', () => {
    expect(monthlyNeeded(goal({ dueDate: NOW }), NOW)).toBe(580000);
  });

  it('formats the due label in French', () => {
    expect(dueLabel(new Date(2027, 2, 15).getTime())).toBe('mars 2027');
    expect(dueLabel(null)).toBeNull();
  });

  it('sums saved amounts and lists distinct accounts', () => {
    const goals = [goal(), goal({ id: 2, saved: 30000, accountName: 'Banque 2' })];
    expect(totalSaved(goals)).toBe(450000);
    expect(savedAccounts(goals)).toEqual(['Banque 2']);
  });
});

describe('highlightGoal', () => {
  it('skips finished goals', () => {
    expect(highlightGoal([goal({ saved: 1_000_000 })])).toBeNull();
  });

  it('prefers the nearest due date', () => {
    const picked = highlightGoal([
      goal({ id: 1, dueDate: 3_000 }),
      goal({ id: 2, dueDate: 1_000 }),
      goal({ id: 3, saved: 900_000, dueDate: null }),
    ]);
    expect(picked?.id).toBe(2);
  });

  it('falls back to the most advanced goal', () => {
    const picked = highlightGoal([
      goal({ id: 1, saved: 100, dueDate: null }),
      goal({ id: 2, saved: 600_000, dueDate: null }),
    ]);
    expect(picked?.id).toBe(2);
  });
});
