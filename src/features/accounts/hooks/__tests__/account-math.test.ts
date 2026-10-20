import { litTicks, shareOf } from '../account-math';

describe('shareOf', () => {
  it('rounds the share of the total', () => {
    expect(shareOf(1_280_000, 2_450_000)).toBe(52);
    expect(shareOf(410_000, 2_450_000)).toBe(17);
  });

  it('treats negative balances and empty totals as zero', () => {
    expect(shareOf(-5_000, 100_000)).toBe(0);
    expect(shareOf(5_000, 0)).toBe(0);
    expect(shareOf(5_000, -10_000)).toBe(0);
  });

  it('caps at 100 when other accounts are negative', () => {
    expect(shareOf(120_000, 100_000)).toBe(100);
  });
});

describe('litTicks', () => {
  it('lights ticks in proportion', () => {
    expect(litTicks(52, 26)).toBe(14);
    expect(litTicks(100, 26)).toBe(26);
  });

  it('lights one tick for a tiny positive share', () => {
    expect(litTicks(1, 26)).toBe(1);
  });

  it('lights nothing for an empty share', () => {
    expect(litTicks(0, 26)).toBe(0);
  });
});
