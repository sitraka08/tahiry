import { z } from 'zod';

import { parseAmount } from '@/lib/money';

export const budgetSchema = z.object({
  total: z.string().refine((v) => parseAmount(v) > 0, 'Entre un budget total'),
  limits: z.record(z.string(), z.string()),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;
