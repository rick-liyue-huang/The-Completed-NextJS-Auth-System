'use server';

import * as zod from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
  // console.log('values', values); // pass values to server
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPwd = await bcrypt.hash(password, 10);

  const user = await bcrypt.hash(password, 10);

  const exitingUser = await getUserByEmail(email);

  if (exitingUser) {
    return { error: 'User already exists' };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPwd,
      name,
    },
  });

  // TODO: send verification token email

  return { success: 'User created successfully' };
};
