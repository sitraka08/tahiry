import type { Counts } from '../types';

export const DENOMINATIONS = [20000, 10000, 5000, 2000, 1000, 500, 200, 100];

export const emptyCounts = (): Counts =>
  Object.fromEntries(DENOMINATIONS.map((value) => [value, 0]));

export const totalOf = (counts: Counts) =>
  DENOMINATIONS.reduce((sum, value) => sum + value * (counts[value] ?? 0), 0);

export const gapOf = (counted: number, expected: number) => counted - expected;

export function adjustCount(counts: Counts, value: number, delta: number): Counts {
  return { ...counts, [value]: Math.max((counts[value] ?? 0) + delta, 0) };
}
