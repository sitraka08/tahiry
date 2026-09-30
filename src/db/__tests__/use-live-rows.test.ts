import { act, renderHook } from '@testing-library/react-native';
import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { useLiveRows } from '../use-live-rows';

type Listener = (event: { tableName: string }) => void;
let listener: Listener | null = null;

jest.mock('expo-sqlite', () => ({
  addDatabaseChangeListener: (fn: Listener) => {
    listener = fn;
    return { remove: () => (listener = null) };
  },
}));

const accounts = sqliteTable('accounts', { id: integer('id') });
const transactions = sqliteTable('transactions', { id: integer('id') });

async function setup() {
  let calls = 0;
  const query = {
    then: (resolve: (rows: number[]) => void) => {
      calls += 1;
      resolve([calls]);
    },
  } as unknown as PromiseLike<number[]>;
  const hook = await renderHook(() => useLiveRows(query, [accounts, transactions], []));
  return { hook, calls: () => calls };
}

describe('useLiveRows', () => {
  it('loads rows on mount', async () => {
    const { hook } = await setup();
    expect(hook.result.current).toEqual([1]);
  });

  it('reloads when a joined table changes', async () => {
    const { hook, calls } = await setup();
    await act(async () => listener?.({ tableName: 'transactions' }));
    expect(calls()).toBe(2);
    expect(hook.result.current).toEqual([2]);
  });

  it('ignores unrelated tables', async () => {
    const { calls } = await setup();
    await act(async () => listener?.({ tableName: 'settings' }));
    expect(calls()).toBe(1);
  });
});
