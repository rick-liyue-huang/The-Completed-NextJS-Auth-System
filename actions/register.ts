'use server';

// here we only store the user information in database, but not attend the credentials, which is done in auth.config.ts
import * as z from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendEmail } from '@/lib/email';

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

  // HERE WE create the verification token
  // and this action will send the token to @/routes.ts
  const verificationToken = await generateVerificationToken(email);

  // HERE WE send the verification email
  await sendEmail(verificationToken.email, verificationToken.token);

  return {
    success:
      'user created, and registered successfully, we send the confirmation email to your email address, please check it out',
  };

  // revalidatePath('/login');
  // revalidateTag('login');
};
