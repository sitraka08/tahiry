export const MIGRATIONS: string[][] = [
  [
    `CREATE TABLE accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      detail TEXT,
      initial_balance INTEGER NOT NULL DEFAULT 0,
      position INTEGER NOT NULL DEFAULT 0,
      counted_at INTEGER,
      archived INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kind TEXT NOT NULL,
      key TEXT,
      label TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      amount INTEGER NOT NULL,
      account_id INTEGER NOT NULL REFERENCES accounts(id),
      to_account_id INTEGER REFERENCES accounts(id),
      category_id INTEGER REFERENCES categories(id),
      note TEXT,
      receipt_uri TEXT,
      date INTEGER NOT NULL,
      recurring INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    )`,
    `CREATE INDEX idx_transactions_date ON transactions(date)`,
    `CREATE TABLE debts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      direction TEXT NOT NULL,
      person TEXT NOT NULL,
      amount INTEGER NOT NULL,
      account_id INTEGER REFERENCES accounts(id),
      date INTEGER NOT NULL,
      due_date INTEGER,
      settled INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE debt_payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      debt_id INTEGER NOT NULL REFERENCES debts(id) ON DELETE CASCADE,
      amount INTEGER NOT NULL,
      date INTEGER NOT NULL
    )`,
    `CREATE TABLE goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      target INTEGER NOT NULL,
      due_date INTEGER,
      account_id INTEGER REFERENCES accounts(id)
    )`,
    `CREATE TABLE goal_deposits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      goal_id INTEGER NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
      amount INTEGER NOT NULL,
      date INTEGER NOT NULL
    )`,
    `CREATE TABLE budgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month TEXT NOT NULL,
      category_id INTEGER REFERENCES categories(id),
      amount INTEGER NOT NULL
    )`,
    `CREATE TABLE reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount INTEGER,
      account_id INTEGER REFERENCES accounts(id),
      due_date INTEGER NOT NULL,
      repeat TEXT NOT NULL DEFAULT 'none',
      done INTEGER NOT NULL DEFAULT 0,
      notification_id TEXT
    )`,
    `CREATE TABLE settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`,
  ],
];
