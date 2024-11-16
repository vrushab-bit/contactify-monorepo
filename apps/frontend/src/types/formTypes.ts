import { contactAddSchema } from '@/schemas/ContactAddSchema';
import { z } from 'zod';

export type contactAddSchemaType = z.infer<typeof contactAddSchema>;
