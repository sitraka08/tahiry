import { formatAmount, formatCompact, formatNumber, formatSigned, parseAmount } from '../money';

describe('money', () => {
  it('groups thousands with a non-breaking space', () => {
    expect(formatNumber(2845000)).toBe('2 845 000');
  });

  it('formats amounts with sign and currency', () => {
    expect(formatAmount(-42500)).toBe('−42 500 Ar');
    expect(formatSigned(1200000)).toBe('+1 200 000 Ar');
  });

  it('formats compact values', () => {
    expect(formatCompact(2845000)).toBe('2,85 M');
    expect(formatCompact(612000)).toBe('612 k');
  });

  it('parses user input to an integer', () => {
    expect(parseAmount('1 200 000 Ar')).toBe(1200000);
    expect(parseAmount('')).toBe(0);
  });
});
