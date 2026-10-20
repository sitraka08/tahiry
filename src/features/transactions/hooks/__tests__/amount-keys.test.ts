import { formatNumber } from '@/lib/money';

import { applyKey, balanceAfter } from '../amount-keys';

const f = formatNumber;

describe('applyKey', () => {
  it('appends digits and formats the amount', () => {
    expect(applyKey('', '4')).toBe('4');
    expect(applyKey('4', '5')).toBe('45');
    expect(applyKey('45', '000')).toBe(f(45_000));
  });

  it('ignores leading zeros', () => {
    expect(applyKey('', '0')).toBe('');
    expect(applyKey('', '000')).toBe('');
  });

  it('removes the last digit', () => {
    expect(applyKey(f(45_000), 'back')).toBe(f(4_500));
    expect(applyKey('4', 'back')).toBe('');
    expect(applyKey('', 'back')).toBe('');
  });

  it('stops at the maximum length', () => {
    expect(applyKey(f(99_999_999_999), '9')).toBe(f(99_999_999_999));
    expect(applyKey(f(9_999_999_999), '000')).toBe(f(9_999_999_999));
  });
});

describe('balanceAfter', () => {
  it('adds income and subtracts expenses and transfers', () => {
    expect(balanceAfter('in', 100_000, 20_000)).toBe(120_000);
    expect(balanceAfter('out', 100_000, 20_000)).toBe(80_000);
    expect(balanceAfter('transfer', 100_000, 20_000)).toBe(80_000);
  });
});
