import type { DebtItem } from '../../types';
import { initialsOf, progressOf, remainingOf, summarizeDebts } from '../debt-math';

const debt = (over: Partial<DebtItem>): DebtItem => ({
  id: 1,
  direction: 'lent',
  person: 'Rivo',
  amount: 100000,
  paid: 0,
  accountId: 1,
  accountName: 'Espèces',
  date: 0,
  dueDate: null,
  settled: false,
  ...over,
});

describe('debt math', () => {
  it('computes the remaining amount and progress', () => {
    const d = debt({ paid: 50000 });
    expect(remainingOf(d)).toBe(50000);
    expect(progressOf(d)).toBe(50);
  });

  it('never goes below zero or above 100 %', () => {
    const d = debt({ paid: 120000 });
    expect(remainingOf(d)).toBe(0);
    expect(progressOf(d)).toBe(100);
  });

  it('summarizes open debts by direction', () => {
    const summary = summarizeDebts([
      debt({ id: 1, paid: 50000 }),
      debt({ id: 2, amount: 100000 }),
      debt({ id: 3, direction: 'borrowed', amount: 100000 }),
      debt({ id: 4, settled: true }),
    ]);
    expect(summary).toEqual({ owedToMe: 150000, owedToMeCount: 2, iOwe: 100000, iOweCount: 1 });
  });

  it('builds initials', () => {
    expect(initialsOf('Rivo Andry')).toBe('RA');
    expect(initialsOf('rivo')).toBe('RI');
    expect(initialsOf('  ')).toBe('?');
  });
});
