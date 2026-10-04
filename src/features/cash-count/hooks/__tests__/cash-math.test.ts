import { DENOMINATIONS, adjustCount, emptyCounts, gapOf, totalOf } from '../cash-math';

describe('cash math', () => {
  it('starts with zero for every denomination', () => {
    const counts = emptyCounts();
    expect(Object.keys(counts)).toHaveLength(DENOMINATIONS.length);
    expect(totalOf(counts)).toBe(0);
  });

  it('totals notes and coins', () => {
    const counts = { ...emptyCounts(), 20000: 15, 10000: 8, 5000: 4, 2000: 3, 1000: 3, 500: 2 };
    expect(totalOf(counts)).toBe(410000);
  });

  it('computes the gap against the expected amount', () => {
    expect(gapOf(410000, 427000)).toBe(-17000);
    expect(gapOf(427000, 427000)).toBe(0);
  });

  it('never goes below zero when adjusting', () => {
    const counts = adjustCount(emptyCounts(), 500, -1);
    expect(counts[500]).toBe(0);
    expect(adjustCount(counts, 500, 2)[500]).toBe(2);
  });
});
