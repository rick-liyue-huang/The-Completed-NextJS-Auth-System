'use server';

import * as zod from 'zod';
import { LoginSchema } from '@/schemas';

export const login = async (values: zod.infer<typeof LoginSchema>) => {
  // console.log('values', values); // pass values to server
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  return { success: 'Email sent successfully' };
};
