import { getTableConfig, type SQLiteTable } from 'drizzle-orm/sqlite-core';
import { addDatabaseChangeListener } from 'expo-sqlite';
import { useEffect, useState, type DependencyList } from 'react';

export function useLiveRows<T>(
  query: PromiseLike<T[]>,
  tables: SQLiteTable[],
  deps: DependencyList,
) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const names = new Set(tables.map((table) => getTableConfig(table).name));
    const run = () => {
      query.then(setData);
    };
    run();
    const subscription = addDatabaseChangeListener(({ tableName }) => {
      if (names.has(tableName)) run();
    });
    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return data;
}
