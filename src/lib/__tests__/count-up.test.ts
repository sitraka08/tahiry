import { countAt } from '../count-up';

describe('countAt', () => {
  it('starts and ends on the exact amounts', () => {
    expect(countAt(0, 2_450_000, 0)).toBe(0);
    expect(countAt(0, 2_450_000, 1)).toBe(2_450_000);
  });

  it('eases out so most of the way is done early', () => {
    expect(countAt(0, 1000, 0.5)).toBe(875);
  });

  it('counts down as well as up and stays an integer', () => {
    expect(countAt(1000, 0, 0.5)).toBe(125);
    expect(Number.isInteger(countAt(0, 7, 0.3))).toBe(true);
  });

  it('clamps progress outside 0 to 1', () => {
    expect(countAt(0, 100, 2)).toBe(100);
    expect(countAt(0, 100, -1)).toBe(0);
  });
});
