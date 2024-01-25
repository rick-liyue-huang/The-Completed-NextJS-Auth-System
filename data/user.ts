'use server';

import { db } from '@/lib/db';
import email from 'next-auth/providers/email';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });

    return user;
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: id },
    });

    return user;
  } catch (err) {
    return null;
  }
};
