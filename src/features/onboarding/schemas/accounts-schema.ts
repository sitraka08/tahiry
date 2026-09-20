import { z } from 'zod';

export const draftSchema = z.object({
  type: z.enum(['bank', 'mobile', 'cash']),
  name: z.string().trim().min(1, 'Donne un nom'),
  balance: z.string(),
});

export const accountsStepSchema = z.object({
  accounts: z.array(draftSchema).min(1, 'Ajoute au moins un compte'),
});

export type AccountsStepValues = z.infer<typeof accountsStepSchema>;
