import { z } from 'zod';

export const reminderSchema = z.object({
  title: z.string().trim().min(1, 'Donne un titre'),
  amount: z.string(),
  accountId: z.number().nullable(),
  dueInDays: z.number(),
  repeat: z.enum(['none', 'weekly', 'monthly']),
});

export type ReminderFormValues = z.infer<typeof reminderSchema>;
