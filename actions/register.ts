'use server';

import * as zod from 'zod';
import { RegisterSchema } from '@/schemas';

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
  // console.log('values', values); // pass values to server
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  return { success: 'User created successfully' };
};
