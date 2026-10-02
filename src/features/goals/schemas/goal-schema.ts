import { z } from 'zod';

import { parseAmount } from '@/lib/money';

export const goalSchema = z.object({
  name: z.string().trim().min(1, 'Donne un nom à ton objectif'),
  target: z.string().refine((v) => parseAmount(v) > 0, 'Entre un montant'),
  dueInMonths: z.number().nullable(),
  accountId: z.number().nullable(),
});

export type GoalFormValues = z.infer<typeof goalSchema>;

export const depositSchema = z.object({
  amount: z.string().refine((v) => parseAmount(v) > 0, 'Entre un montant'),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
