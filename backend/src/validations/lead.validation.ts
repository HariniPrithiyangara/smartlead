import { z } from 'zod';

export const createLeadSchema = z.object({
  name:    z.string().min(2, 'Name is required').trim(),
  email:   z.string().email('Invalid email').toLowerCase(),
  company: z.string().optional(),
  phone:   z.string().optional(),
  status:  z.enum(['New', 'Contacted', 'Qualified', 'Lost']).default('New'),
  source:  z.enum(['Website', 'Referral', 'Instagram', 'LinkedIn', 'Cold Outreach', 'Event']),
  notes:   z.string().optional(),
});

export const updateLeadSchema = createLeadSchema.partial();

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
