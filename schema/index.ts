import * as zod from 'zod';

export const LoginSchema = zod.object({
  email: zod.string().email({
    message: 'Please enter a valid email address',
  }),
  password: zod.string().min(1, {
    message: 'Please enter your password',
  }),
});

export const RegisterSchema = zod.object({
  email: zod.string().email({
    message: 'Please enter a valid email address',
  }),
  username: zod.string().min(1, {
    message: 'Please enter your username',
  }),
  password: zod.string().min(6, {
    message: 'At least 6 characters',
  }),
});
