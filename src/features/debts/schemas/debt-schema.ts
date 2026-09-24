import { z } from 'zod';

import { parseAmount } from '@/lib/money';

export const debtSchema = z.object({
  direction: z.enum(['lent', 'borrowed']),
  person: z.string().trim().min(1, 'Entre un nom'),
  amount: z.string().refine((v) => parseAmount(v) > 0, 'Entre un montant'),
  accountId: z.number({ message: 'Choisis un compte' }),
  dueInDays: z.number().nullable(),
});

export type DebtFormValues = z.infer<typeof debtSchema>;

export const paymentSchema = (max: number) =>
  z.object({
    amount: z
      .string()
      .refine((v) => parseAmount(v) > 0, 'Entre un montant')
      .refine((v) => parseAmount(v) <= max, 'Plus que le reste à payer'),
    accountId: z.number({ message: 'Choisis un compte' }),
  });

export type PaymentFormValues = z.infer<ReturnType<typeof paymentSchema>>;
