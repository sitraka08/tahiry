import { differenceInCalendarMonths, format } from 'date-fns';
import { fr } from 'date-fns/locale';

import type { GoalItem } from '../types';

export const percentOf = (goal: Pick<GoalItem, 'saved' | 'target'>) =>
  goal.target > 0 ? Math.min(Math.round((goal.saved / goal.target) * 100), 100) : 0;

export function monthlyNeeded(goal: GoalItem, now: number) {
  if (!goal.dueDate || goal.saved >= goal.target) return null;
  const months = Math.max(differenceInCalendarMonths(goal.dueDate, now), 1);
  return Math.ceil((goal.target - goal.saved) / months);
}

export const dueLabel = (dueDate: number | null) =>
  dueDate ? format(dueDate, 'MMMM yyyy', { locale: fr }) : null;

export const totalSaved = (goals: GoalItem[]) => goals.reduce((sum, g) => sum + g.saved, 0);

export function savedAccounts(goals: GoalItem[]) {
  const names = goals.flatMap((g) => (g.accountName ? [g.accountName] : []));
  return [...new Set(names)];
}

// The goal to show on the home screen: unfinished, nearest due date first,
// then the most advanced one.
export function highlightGoal(goals: GoalItem[]) {
  const open = goals.filter((g) => g.saved < g.target);
  if (open.length === 0) return null;
  return [...open].sort((a, b) => {
    const dueA = a.dueDate ?? Infinity;
    const dueB = b.dueDate ?? Infinity;
    return dueA !== dueB ? dueA - dueB : percentOf(b) - percentOf(a);
  })[0];
}
