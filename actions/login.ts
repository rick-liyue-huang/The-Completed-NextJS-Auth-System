'use server';

import * as z from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { LoginSchema } from '@/schemas';

export const login = async (value: z.infer<typeof LoginSchema>) => {
  console.log('login action', value);

  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }
  return { success: 'Email sent, and login successfully' };

  // revalidatePath('/login');
  // revalidateTag('login');
};
