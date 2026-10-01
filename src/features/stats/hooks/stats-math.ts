import {
  addDays,
  endOfDay,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { fr } from 'date-fns/locale';

import type { CategoryShare, Period, StatRow, StatsData, StatsInput } from '../types';

export const PERIOD_SUFFIX: Record<Period, string> = {
  week: 'sur 7 jours',
  month: 'sur 30 jours',
  year: 'sur 12 mois',
};

export function periodRange(period: Period, now: number) {
  if (period === 'week') {
    const from = startOfDay(subDays(now, 6));
    const points = Array.from({ length: 7 }, (_, i) =>
      Math.min(endOfDay(addDays(from, i)).getTime(), now),
    );
    const labels = points.map((p) => format(p, 'EEEEE', { locale: fr }).toUpperCase());
    return { from: from.getTime(), points, labels };
  }
  if (period === 'month') {
    const from = startOfDay(subDays(now, 29));
    const points = [4, 9, 14, 19, 24, 29].map((i) =>
      Math.min(endOfDay(addDays(from, i)).getTime(), now),
    );
    const labels = points.map((p) => format(p, 'd MMM', { locale: fr }));
    return { from: from.getTime(), points, labels };
  }
  const from = startOfMonth(subMonths(now, 11));
  const points = Array.from({ length: 12 }, (_, i) =>
    Math.min(endOfMonth(addDays(startOfMonth(subMonths(now, 11 - i)), 1)).getTime(), now),
  );
  const labels = points.map((p) => format(p, 'MMMMM', { locale: fr }).toUpperCase());
  return { from: from.getTime(), points, labels };
}

export function topCategories(rows: StatRow[], limit = 5): CategoryShare[] {
  const expenses = rows.filter((r) => r.type === 'out');
  const total = expenses.reduce((sum, r) => sum + r.amount, 0);
  if (total === 0) return [];

  const byLabel = new Map<string, number>();
  expenses.forEach((r) => {
    const label = r.label ?? 'Autres motifs';
    byLabel.set(label, (byLabel.get(label) ?? 0) + r.amount);
  });

  const sorted = [...byLabel.entries()].sort((a, b) => b[1] - a[1]);
  const head = sorted.slice(0, limit);
  const rest = sorted.slice(limit).reduce((sum, [, value]) => sum + value, 0);
  if (rest > 0) {
    const other = head.find(([label]) => label === 'Autres motifs');
    if (other) other[1] += rest;
    else head.push(['Autres motifs', rest]);
  }

  const max = Math.max(...head.map(([, value]) => value));
  return head.map(([label, value]) => ({
    label,
    total: value,
    percent: Math.round((value / total) * 100),
    share: value / max,
  }));
}

export function buildStats(input: StatsInput, period: Period, now: number): StatsData {
  const { from, points, labels } = periodRange(period, now);
  const rows = input.rows.filter((r) => r.date >= from && r.date <= now);

  const income = rows.filter((r) => r.type === 'in').reduce((sum, r) => sum + r.amount, 0);
  const expense = rows.filter((r) => r.type === 'out').reduce((sum, r) => sum + r.amount, 0);

  const base = input.initialTotal + input.netBefore;
  const values = points.map((point) => {
    const net = rows
      .filter((r) => r.date <= point)
      .reduce((sum, r) => sum + (r.type === 'in' ? r.amount : -r.amount), 0);
    return base + net;
  });

  const first = values[0];
  const last = values[values.length - 1];
  const change = first > 0 ? Math.round(((last - first) / first) * 100) : null;

  return {
    income,
    expense,
    saved: income - expense,
    labels,
    values,
    change,
    categories: topCategories(rows),
  };
}
