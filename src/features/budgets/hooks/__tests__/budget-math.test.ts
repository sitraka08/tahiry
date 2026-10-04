import { buildBudgetView, limitsFor, overruns, perDayOf } from '../budget-math';

const NOW = new Date(2026, 9, 2).getTime();
const categories = [
  { id: 1, label: 'Alimentation' },
  { id: 2, label: 'Factures' },
  { id: 3, label: 'Loisirs' },
];

describe('limitsFor', () => {
  const rows = [
    { month: '2026-08', categoryId: 1, amount: 100 },
    { month: '2026-09', categoryId: 1, amount: 180 },
    { month: '2026-09', categoryId: null, amount: 600 },
    { month: '2026-11', categoryId: 1, amount: 999 },
  ];

  it('picks the latest limit that is not after the month', () => {
    const limits = limitsFor(rows, '2026-10');
    expect(limits.get(1)).toBe(180);
    expect(limits.get(null)).toBe(600);
  });

  it('returns nothing before any budget exists', () => {
    expect(limitsFor(rows, '2026-07').size).toBe(0);
  });
});

describe('perDayOf', () => {
  it('splits the remaining amount over the days left', () => {
    expect(perDayOf(487500, 2, 31)).toBe(16810);
  });

  it('never divides by zero and never goes negative', () => {
    expect(perDayOf(1000, 31, 31)).toBe(1000);
    expect(perDayOf(-500, 2, 31)).toBe(0);
  });
});

describe('buildBudgetView', () => {
  const limits = new Map<number | null, number>([
    [null, 600000],
    [1, 180000],
    [2, 150000],
  ]);
  const spend = [
    { categoryId: 1, spent: 42500 },
    { categoryId: 2, spent: 65000 },
    { categoryId: 3, spent: 5000 },
  ];

  it('computes totals and what is left', () => {
    const view = buildBudgetView({ limits, spend, categories, now: NOW });
    expect(view.total).toBe(600000);
    expect(view.spent).toBe(112500);
    expect(view.remaining).toBe(487500);
    expect(view.percent).toBe(19);
    expect(view.perDay).toBe(16810);
  });

  it('builds lines per limited category plus the rest', () => {
    const view = buildBudgetView({ limits, spend, categories, now: NOW });
    expect(view.lines.map((l) => l.label)).toEqual(['Alimentation', 'Factures', 'Autres motifs']);
    expect(view.lines[0]).toMatchObject({ spent: 42500, limit: 180000, percent: 24, over: false });
    expect(view.lines[2]).toMatchObject({ spent: 5000, limit: 270000 });
  });

  it('flags a category over its limit', () => {
    const view = buildBudgetView({
      limits,
      spend: [{ categoryId: 1, spent: 200000 }],
      categories,
      now: NOW,
    });
    expect(view.lines[0]).toMatchObject({ over: true, percent: 100 });
  });

  it('works without any budget', () => {
    const view = buildBudgetView({ limits: new Map(), spend: [], categories, now: NOW });
    expect(view.total).toBe(0);
    expect(view.lines).toEqual([]);
  });
});

describe('overruns', () => {
  it('lists categories above their limit with the excess', () => {
    const result = overruns({
      limits: new Map([[1, 180000]]),
      spend: [{ categoryId: 1, spent: 210000 }],
      categories,
    });
    expect(result).toEqual([{ label: 'Alimentation', excess: 30000 }]);
  });
});
