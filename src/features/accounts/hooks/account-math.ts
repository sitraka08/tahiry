// Share of the total, 0 to 100. Negative balances and totals count as empty.
export function shareOf(balance: number, total: number) {
  if (total <= 0 || balance <= 0) return 0;
  return Math.min(100, Math.round((balance / total) * 100));
}

// Number of lit ticks on a gauge. Any positive share lights at least one.
export function litTicks(share: number, count: number) {
  if (share <= 0) return 0;
  return Math.max(1, Math.min(count, Math.round((share / 100) * count)));
}
