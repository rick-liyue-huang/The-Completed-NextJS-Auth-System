'use server';

// here we just login the user and send email to connect with the stored user information, but not attend the credentials
import { db } from '@/lib/db';
import * as z from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import { sendEmail, sendTwoFactorTokenEmail } from '@/lib/email';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/lib/tokens';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (value: z.infer<typeof LoginSchema>) => {
  console.log('login action', value);

  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  // modify schema from schema/index and get the code
  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email not found, login fail' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendEmail(verificationToken.email, verificationToken.token);

    return {
      success:
        'Email sent, and confirm your email address first, then login successfully',
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // verify code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: 'no code in login action' };
      }
      if (twoFactorToken.token !== code) {
        return { error: 'wrong code in login action' };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: 'code expired' };
      }

      await db.twoFactorConfirmationToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      // resend the code

      const twoFactorToken = await generateTwoFactorToken(existingUser?.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      // match with 'CredentialsProvider' in auth.config.ts
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }

    throw err;
  }

  // return { success: 'Email sent, and login successfully' };

  // revalidatePath('/login');
  // revalidateTag('login');
};
