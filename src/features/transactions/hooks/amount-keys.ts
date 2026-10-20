import { formatNumber, parseAmount } from '@/lib/money';

import type { TransactionType } from '../types';

export type AmountKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '000' | 'back';

// Ten billion Ariary is far above any real operation and stays a safe integer.
const MAX_DIGITS = 11;

// Applies a keypad key to a formatted amount and returns the new formatted amount.
export function applyKey(value: string, key: AmountKey) {
  const digits = String(parseAmount(value) || '');
  const next =
    key === 'back' ? digits.slice(0, -1) : digits === '' && key.startsWith('0') ? '' : digits + key;
  if (next.length > MAX_DIGITS) return value;
  const n = Number(next);
  return n ? formatNumber(n) : '';
}

// Balance of the source account once the operation is saved.
export function balanceAfter(type: TransactionType, balance: number, amount: number) {
  return type === 'in' ? balance + amount : balance - amount;
}
