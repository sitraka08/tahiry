import { addDays, addMonths, differenceInCalendarDays, startOfDay } from 'date-fns';

import type { ReminderItem, ReminderSummary, Repeat, Tone } from '../types';

export function dueStatus(dueDate: number, now: number): { label: string; tone: Tone } {
  const days = differenceInCalendarDays(dueDate, now);
  if (days < 0) return { label: 'En retard', tone: 'late' };
  if (days === 0) return { label: 'Aujourd’hui', tone: 'soon' };
  if (days === 1) return { label: 'Demain', tone: 'soon' };
  return { label: `Dans ${days} j`, tone: days <= 3 ? 'soon' : 'later' };
}

export function nextDueDate(dueDate: number, repeat: Repeat) {
  if (repeat === 'weekly') return addDays(dueDate, 7).getTime();
  if (repeat === 'monthly') return addMonths(dueDate, 1).getTime();
  return null;
}

export function dueDateIn(days: number, now: number, hour = 9) {
  return startOfDay(addDays(now, days)).getTime() + hour * 3_600_000;
}

export function summarize(items: ReminderItem[], now: number, horizonDays = 30): ReminderSummary {
  const within = items.filter((i) => differenceInCalendarDays(i.dueDate, now) <= horizonDays);
  return {
    total: within.reduce((sum, i) => sum + (i.amount ?? 0), 0),
    count: within.length,
    lateCount: within.filter((i) => differenceInCalendarDays(i.dueDate, now) < 0).length,
  };
}

export function pendingCount(items: ReminderItem[], now: number) {
  return items.filter((i) => differenceInCalendarDays(i.dueDate, now) <= 3).length;
}
