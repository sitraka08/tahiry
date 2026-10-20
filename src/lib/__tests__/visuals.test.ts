import { IN_CATEGORIES, OUT_CATEGORIES } from '@/db/seed';

import { withAlpha } from '../color';
import { accountVisual, categoryVisual } from '../visuals';

jest.mock('lucide-react-native', () => new Proxy({}, { get: (_, name) => name }));

describe('categoryVisual', () => {
  it('gives every seeded category except other its own visual', () => {
    for (const [key] of OUT_CATEGORIES.filter(([k]) => k !== 'other')) {
      expect(categoryVisual('out', key).color).not.toBe('subtle');
    }
    for (const [key] of IN_CATEGORIES.filter(([k]) => k !== 'other')) {
      expect(categoryVisual('in', key).color).not.toBe('subtle');
    }
  });

  it('falls back to a neutral visual', () => {
    expect(categoryVisual('out', null).color).toBe('subtle');
    expect(categoryVisual('out', 'unknown').color).toBe('subtle');
    expect(categoryVisual('in', 'food').color).toBe('subtle');
  });
});

describe('accountVisual', () => {
  it('maps each account type to a color', () => {
    expect(accountVisual('mobile').color).toBe('catSand');
    expect(accountVisual('bank').color).toBe('catBlue');
    expect(accountVisual('cash').color).toBe('catOrange');
  });
});

describe('withAlpha', () => {
  it('appends a two digit alpha', () => {
    expect(withAlpha('#1ED760', 0.15)).toBe('#1ED76026');
    expect(withAlpha('#FFFFFF', 1)).toBe('#FFFFFFFF');
    expect(withAlpha('#000000', 0)).toBe('#00000000');
  });

  it('clamps out of range values', () => {
    expect(withAlpha('#123456', 2)).toBe('#123456FF');
  });
});
