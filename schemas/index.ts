import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(1, {
    message: 'Password required',
  }),
  code: z.optional(z.string()), // for 2FA
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  username: z.string().min(1, {
    message: 'Name required',
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});
