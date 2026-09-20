import { z } from 'zod';

export const accountSchema = z.object({
  type: z.enum(['bank', 'mobile', 'cash']),
  name: z.string().trim().min(1, 'Donne un nom au compte'),
  detail: z.string().trim().optional(),
  balance: z.string().regex(/^[\d\s]*$/, 'Montant invalide'),
});

export type AccountFormValues = z.infer<typeof accountSchema>;
