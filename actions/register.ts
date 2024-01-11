'use server';
import { RegisterSchema } from '@/schema';
import * as zod from 'zod';

export const register = async (value: zod.infer<typeof RegisterSchema>) => {
  console.log('register', value);
  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    // throw new Error(validatedFields.error.message);
    return { error: validatedFields.error.message };
  }

  return {
    success: 'register successfully',
  };
};
