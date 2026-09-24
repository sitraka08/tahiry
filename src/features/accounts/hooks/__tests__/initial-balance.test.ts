import { initialBalanceFor } from '../initial-balance';

describe('initialBalanceFor', () => {
  it('keeps the initial balance when the balance is unchanged', () => {
    expect(initialBalanceFor(1200000, 1200000, 1000000)).toBe(1000000);
  });

  it('shifts the initial balance by the correction', () => {
    expect(initialBalanceFor(410000, 427000, 500000)).toBe(483000);
  });
});
