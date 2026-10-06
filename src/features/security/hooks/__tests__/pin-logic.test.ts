import { appendDigit, cooldownMs, isComplete, removeDigit, shouldLock } from '../pin-logic';

describe('pin entry', () => {
  it('appends digits up to four', () => {
    expect(appendDigit('12', '3')).toBe('123');
    expect(appendDigit('1234', '5')).toBe('1234');
  });

  it('removes the last digit', () => {
    expect(removeDigit('123')).toBe('12');
    expect(removeDigit('')).toBe('');
  });

  it('detects a complete pin', () => {
    expect(isComplete('1234')).toBe(true);
    expect(isComplete('123')).toBe(false);
  });
});

describe('cooldownMs', () => {
  it('allows the first four attempts freely', () => {
    expect(cooldownMs(4)).toBe(0);
  });

  it('waits 30 seconds after five failures and doubles it', () => {
    expect(cooldownMs(5)).toBe(30_000);
    expect(cooldownMs(10)).toBe(60_000);
  });

  it('caps the wait at five minutes', () => {
    expect(cooldownMs(100)).toBe(300_000);
  });
});

describe('shouldLock', () => {
  it('locks immediately when the delay is zero', () => {
    expect(shouldLock(1000, 1000, 0)).toBe(true);
  });

  it('waits for the delay to elapse', () => {
    expect(shouldLock(0, 30_000, 1)).toBe(false);
    expect(shouldLock(0, 60_000, 1)).toBe(true);
  });

  it('does not lock when the app was never in background', () => {
    expect(shouldLock(null, 999_999, 0)).toBe(false);
  });
});
