import { z } from 'zod';

import { parseAmount } from '@/lib/money';

export const transactionSchema = z
  .object({
    type: z.enum(['out', 'in', 'transfer']),
    amount: z.string().refine((v) => parseAmount(v) > 0, 'Entre un montant'),
    accountId: z.number({ message: 'Choisis un compte' }),
    toAccountId: z.number().nullable(),
    categoryId: z.number().nullable(),
    note: z.string().trim().optional(),
    date: z.number(),
    recurring: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.type === 'transfer') {
      if (v.toAccountId == null || v.toAccountId === v.accountId) {
        ctx.addIssue({ code: 'custom', path: ['toAccountId'], message: 'Choisis un autre compte' });
      }
    } else if (v.categoryId == null) {
      ctx.addIssue({ code: 'custom', path: ['categoryId'], message: 'Choisis un motif' });
    }
  });

export type TransactionFormValues = z.infer<typeof transactionSchema>;
