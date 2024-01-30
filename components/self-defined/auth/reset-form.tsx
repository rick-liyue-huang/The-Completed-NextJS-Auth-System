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
import { ResetSchema } from '@/schemas';
import * as z from 'zod';
import { FormErrors } from './form-errors';
import { FormSuccess } from './form-success';
import { resetPassword } from '@/actions/reset-password';

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmitted = (value: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      console.log('value: ', value);
      resetPassword(value).then((data) => {
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
      headerLabel="Forget your Password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitted)} className="space-y-6">
          <div className="space-x-4">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl {...field} id="email">
                    <Input
                      {...field}
                      placeholder="enter email..."
                      disabled={isPending}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300">
                    {form.formState.errors.email?.message}
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
            Resend the verification email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
