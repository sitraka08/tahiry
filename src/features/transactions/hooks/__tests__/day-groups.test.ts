import type { TransactionItem } from '../../types';
import { groupByDay, netOf } from '../day-groups';

const item = (over: Partial<TransactionItem>): TransactionItem => ({
  id: 1,
  type: 'out',
  amount: 1000,
  note: null,
  date: new Date(2026, 9, 20, 10).getTime(),
  receiptUri: null,
  accountId: 1,
  toAccountId: null,
  categoryId: null,
  categoryKey: null,
  accountName: 'Mvola',
  toAccountName: null,
  categoryLabel: null,
  ...over,
});

describe('netOf', () => {
  it('adds income, subtracts expenses and ignores transfers', () => {
    expect(
      netOf([
        { type: 'in', amount: 1_200_000 },
        { type: 'out', amount: 50_000 },
        { type: 'transfer', amount: 300_000 },
      ]),
    ).toBe(1_150_000);
  });

  it('is zero for an empty day', () => {
    expect(netOf([])).toBe(0);
  });
});

describe('groupByDay', () => {
  it('groups by day in input order with a net per day', () => {
    const today = new Date(2026, 9, 20, 18).getTime();
    const yesterday = new Date(2026, 9, 19, 9).getTime();
    const groups = groupByDay([
      item({ id: 1, date: today, amount: 45_000 }),
      item({ id: 2, date: today, amount: 1_200 }),
      item({ id: 3, date: yesterday, type: 'in', amount: 1_200_000 }),
    ]);
    expect(groups.map((g) => g.items.map((i) => i.id))).toEqual([[1, 2], [3]]);
    expect(groups.map((g) => g.net)).toEqual([-46_200, 1_200_000]);
  });
});
