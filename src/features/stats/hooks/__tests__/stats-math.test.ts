import type { StatRow } from '../../types';
import { buildStats, periodRange, toChartPoints, topCategories } from '../stats-math';

const NOW = new Date(2026, 9, 9, 15, 0).getTime();
const day = (d: number, h = 12) => new Date(2026, 9, d, h, 0).getTime();

const row = (
  type: 'in' | 'out',
  amount: number,
  date: number,
  label: string | null = null,
): StatRow => ({
  type,
  amount,
  date,
  label,
});

describe('periodRange', () => {
  it('builds 7 daily points for a week', () => {
    const { points, labels } = periodRange('week', NOW);
    expect(points).toHaveLength(7);
    expect(labels).toHaveLength(7);
    expect(points[6]).toBe(NOW);
  });

  it('builds 6 points for 30 days and 12 for a year', () => {
    expect(periodRange('month', NOW).points).toHaveLength(6);
    expect(periodRange('year', NOW).points).toHaveLength(12);
  });
});

describe('topCategories', () => {
  it('groups expenses, sorts them and computes percentages', () => {
    const result = topCategories([
      row('out', 300, 1, 'Alimentation'),
      row('out', 100, 2, 'Transport'),
      row('out', 100, 3, 'Alimentation'),
      row('in', 999, 4, 'Salaire'),
    ]);
    expect(result.map((c) => c.label)).toEqual(['Alimentation', 'Transport']);
    expect(result[0]).toMatchObject({ total: 400, percent: 80, share: 1 });
    expect(result[1]).toMatchObject({ total: 100, percent: 20, share: 0.25 });
  });

  it('merges the tail into "Autres motifs"', () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l, i) => row('out', 100 - i, i, l));
    const result = topCategories(rows, 3);
    expect(result).toHaveLength(4);
    expect(result[3].label).toBe('Autres motifs');
  });

  it('returns nothing without expenses', () => {
    expect(topCategories([row('in', 10, 1)])).toEqual([]);
  });
});

describe('buildStats', () => {
  const input = {
    initialTotal: 1000,
    netBefore: 500,
    rows: [row('in', 400, day(3), 'Salaire'), row('out', 100, day(8), 'Alimentation')],
  };

  it('computes totals and savings', () => {
    const stats = buildStats(input, 'week', NOW);
    expect(stats.income).toBe(400);
    expect(stats.expense).toBe(100);
    expect(stats.saved).toBe(300);
  });

  it('builds the balance series including the first day', () => {
    const stats = buildStats(input, 'week', NOW);
    expect(stats.values[0]).toBe(1900);
    expect(stats.values[stats.values.length - 1]).toBe(1800);
    expect(stats.values[2]).toBe(1900);
  });

  it('computes the change in percent', () => {
    expect(buildStats(input, 'week', NOW).change).toBe(-5);
  });

  it('ignores rows outside the period', () => {
    const old = { ...input, rows: [row('out', 5000, new Date(2026, 0, 1).getTime())] };
    expect(buildStats(old, 'week', NOW).expense).toBe(0);
  });
});

describe('toChartPoints', () => {
  it('maps the lowest value to the bottom and the highest to the top', () => {
    const points = toChartPoints([0, 50, 100], 100, 100, 0, 10);
    expect(points[0]).toEqual({ x: 0, y: 90 });
    expect(points[2]).toEqual({ x: 100, y: 10 });
  });

  it('draws a flat line in the middle when values are equal', () => {
    expect(toChartPoints([5, 5], 100, 100, 0, 10).map((p) => p.y)).toEqual([50, 50]);
  });

  it('returns no points for an empty series', () => {
    expect(toChartPoints([], 100, 100)).toEqual([]);
  });
});
