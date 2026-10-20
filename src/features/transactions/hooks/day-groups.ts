import { formatDayLabel, startOfDayKey } from '@/lib/dates';

import type { DayGroup, TransactionItem } from '../types';

// Income minus expenses. Transfers move money between accounts and do not count.
export function netOf(items: Pick<TransactionItem, 'type' | 'amount'>[]) {
  return items.reduce(
    (sum, t) => (t.type === 'in' ? sum + t.amount : t.type === 'out' ? sum - t.amount : sum),
    0,
  );
}

export function groupByDay(items: TransactionItem[]): DayGroup[] {
  const map = new Map<string, DayGroup>();
  for (const item of items) {
    const key = startOfDayKey(item.date);
    const group = map.get(key) ?? { key, label: formatDayLabel(item.date), items: [], net: 0 };
    group.items.push(item);
    map.set(key, group);
  }
  return [...map.values()].map((g) => ({ ...g, net: netOf(g.items) }));
}
