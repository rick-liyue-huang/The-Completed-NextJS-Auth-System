'use server';

import * as z from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { RegisterSchema } from '@/schemas';

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  console.log('register action', value);

  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }
  return { success: 'user created, and registered successfully' };

  // revalidatePath('/login');
  // revalidateTag('login');
};
