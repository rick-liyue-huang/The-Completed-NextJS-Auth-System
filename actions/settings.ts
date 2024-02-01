'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { send } from 'process';
import { sendEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: 'You must be logged in',
    };
  }

  const existingUser = await getUserById(user.id);

  if (!existingUser) {
    return {
      error: 'User not found',
    };
  }

  // here is confirm by provider
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return {
        error: 'Email already in use',
      };
    }

    const verificationToken = await generateVerificationToken(
      values.email as string
    );

    await sendEmail(verificationToken.email, verificationToken.token);

    return { success: 'Verification email sent' };
  }

  if (values.password && values.newPassword && existingUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      existingUser.password
    );

    if (!passwordMatch) {
      return {
        error: 'Password is incorrect',
      };
    }
    const hashedPwd = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPwd;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  return {
    success: 'Settings updated',
  };
};
