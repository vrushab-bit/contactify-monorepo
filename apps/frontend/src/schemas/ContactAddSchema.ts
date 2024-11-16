import { z } from 'zod';

export const contactAddSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  phoneNumbers: z.array(
    z.object({
      number: z.string().min(1, 'Phone number is required'),
      type: z.string(),
      isPrimary: z.boolean(),
    })
  ),
  emails: z.array(
    z
      .object({
        address: z.string().email('Invalid email address'),
        type: z.string(),
        isPrimary: z.boolean(),
      })
      .optional()
  ),
});
