const SPACE = ' ';

export const CURRENCY = 'Ar';

export function formatNumber(value: number) {
  const abs = Math.abs(Math.round(value));
  return String(abs).replace(/\B(?=(\d{3})+(?!\d))/g, SPACE);
}

export function formatAmount(value: number) {
  const sign = value < 0 ? '−' : '';
  return `${sign}${formatNumber(value)}${SPACE}${CURRENCY}`;
}

export function formatSigned(value: number) {
  const sign = value < 0 ? '−' : '+';
  return `${sign}${formatNumber(value)}${SPACE}${CURRENCY}`;
}

export function formatCompact(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${(abs / 1_000_000).toFixed(2).replace('.', ',')} M`;
  if (abs >= 1_000) return `${Math.round(abs / 1_000)} k`;
  return String(abs);
}

export function parseAmount(input: string) {
  const digits = input.replace(/\D/g, '');
  return digits ? Number(digits) : 0;
}
