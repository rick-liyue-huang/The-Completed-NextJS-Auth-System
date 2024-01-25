'use server';

import * as z from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  console.log('register action', value);

  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPwd = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already exists, change another one' };
  }

  await db.user.create({
    data: {
      name: username,
      email: email,
      password: hashedPwd,
    },
  });

  // TODO: send email verification

  return { success: 'user created, and registered successfully' };

  // revalidatePath('/login');
  // revalidateTag('login');
};
