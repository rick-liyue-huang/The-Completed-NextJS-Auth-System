import { UserRole } from '@prisma/client';
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

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'Please enter both password and new password',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'Please enter both password ',
      path: ['password'],
    }
  );
