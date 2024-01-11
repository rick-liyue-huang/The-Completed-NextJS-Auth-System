'use server';
import { LoginSchema } from '@/schema';
import * as zod from 'zod';

export const login = async (value: zod.infer<typeof LoginSchema>) => {
  console.log('login', value);
  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) {
    // throw new Error(validatedFields.error.message);
    return { error: validatedFields.error.message };
  }

  return {
    success: 'login successfully',
  };
};
