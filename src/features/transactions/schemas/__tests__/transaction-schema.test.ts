import { transactionSchema } from '../transaction-schema';

const base = {
  type: 'out' as const,
  amount: '42 500',
  accountId: 1,
  toAccountId: null,
  categoryId: 3,
  date: 1,
  recurring: false,
};

describe('transactionSchema', () => {
  it('accepts a valid expense', () => {
    expect(transactionSchema.safeParse(base).success).toBe(true);
  });

  it('rejects an empty amount', () => {
    expect(transactionSchema.safeParse({ ...base, amount: '' }).success).toBe(false);
  });

  it('requires a category for expenses', () => {
    expect(transactionSchema.safeParse({ ...base, categoryId: null }).success).toBe(false);
  });

  it('requires a different target account for transfers', () => {
    const transfer = { ...base, type: 'transfer' as const, categoryId: null };
    expect(transactionSchema.safeParse({ ...transfer, toAccountId: 1 }).success).toBe(false);
    expect(transactionSchema.safeParse({ ...transfer, toAccountId: 2 }).success).toBe(true);
  });
});
