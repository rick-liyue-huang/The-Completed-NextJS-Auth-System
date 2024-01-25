'use server';

// here we just login the user and send email to connect with the stored user information, but not attend the credentials
import * as z from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (value: z.infer<typeof LoginSchema>) => {
  console.log('login action', value);

  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
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
