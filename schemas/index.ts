import * as zod from 'zod';

export const LoginSchema = zod.object({
  email: zod.string().email({
    message: 'Please enter a valid email address',
  }),
  password: zod.string().min(1, {
    message: 'Password required',
  }),
});

export const RegisterSchema = zod.object({
  email: zod.string().email({
    message: 'Please enter a valid email address',
  }),
  password: zod.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  name: zod.string().min(1, {
    message: 'Name required',
  }),
});
