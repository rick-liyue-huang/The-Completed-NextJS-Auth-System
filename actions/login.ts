'use server';

import * as zod from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: zod.infer<typeof LoginSchema>) => {
  // console.log('values', values); // pass values to server
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  // return { success: 'Email sent successfully' };
  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
};
