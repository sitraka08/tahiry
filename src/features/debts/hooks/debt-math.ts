import type { DebtItem, DebtSummary } from '../types';

export const remainingOf = (debt: Pick<DebtItem, 'amount' | 'paid'>) =>
  Math.max(debt.amount - debt.paid, 0);

export const progressOf = (debt: Pick<DebtItem, 'amount' | 'paid'>) =>
  debt.amount > 0 ? Math.min((debt.paid / debt.amount) * 100, 100) : 0;

export function summarizeDebts(debts: DebtItem[]): DebtSummary {
  const open = debts.filter((d) => !d.settled);
  const lent = open.filter((d) => d.direction === 'lent');
  const borrowed = open.filter((d) => d.direction === 'borrowed');
  const total = (list: DebtItem[]) => list.reduce((sum, d) => sum + remainingOf(d), 0);
  return {
    owedToMe: total(lent),
    owedToMeCount: lent.length,
    iOwe: total(borrowed),
    iOweCount: borrowed.length,
  };
}

export function initialsOf(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
