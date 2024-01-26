'use server';

// here we just login the user and send email to connect with the stored user information, but not attend the credentials
import * as z from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { sendEmail } from '@/lib/email';

export const login = async (value: z.infer<typeof LoginSchema>) => {
  console.log('login action', value);

  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password } = validatedFields.data;

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
