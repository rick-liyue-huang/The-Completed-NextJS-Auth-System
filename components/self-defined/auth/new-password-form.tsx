'use client';

import React, { useTransition } from 'react';
import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NewPasswordSchema } from '@/schemas';
import * as z from 'zod';
import { FormErrors } from './form-errors';
import { FormSuccess } from './form-success';
import { resetPassword } from '@/actions/reset-password';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/new-password';

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmitted = (value: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      console.log('value: ', value);
      newPassword(value, token).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        // TODO: add 2FA
        setSuccess(data?.success); // will be done under verification token email
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter new Password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitted)} className="space-y-6">
          <div className="space-x-4">
            {/* email */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl {...field} id="password">
                    <Input
                      {...field}
                      placeholder="enter password..."
                      disabled={isPending}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300">
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormSuccess message={success} />
          <FormErrors message={error} />
          <Button
            type="submit"
            className="w-full"
            variant={'secondary'}
            disabled={isPending}
          >
            Resend the Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
