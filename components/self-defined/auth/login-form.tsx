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
import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import { FormErrors } from './form-errors';
import { FormSuccess } from './form-success';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');
  const [show2FA, setShow2FA] = React.useState<boolean>(false);

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with another account provider'
      : '';

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitted = (value: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      console.log('value: ', value);
      login(value)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShow2FA(true);
          }
          // if (data?.error) {
          //   setError(data.error);
          // }
          // // TODO: add 2FA
          // setSuccess(data?.success); // will be done under verification token email
        })
        .catch(() => setError('something wrong in login form'));
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome you come back!"
      backButtonLabel="You have not yet registered?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitted)} className="space-y-6">
          {show2FA && (
            <>
              <div className="space-x-4">
                {/* email */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="code">Two Factor Code</FormLabel>
                      <FormControl {...field} id="code">
                        <Input
                          {...field}
                          placeholder="enter code..."
                          disabled={isPending}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300">
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {!show2FA && (
            <>
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
                {/* password */}
              </div>
              <div className="space-x-4">
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
                      <Button
                        size="sm"
                        variant={'link'}
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot your password?</Link>
                      </Button>
                      <FormMessage className="text-red-300">
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          <FormSuccess message={success} />
          <FormErrors message={error || urlError} />
          <Button
            type="submit"
            className="w-full"
            variant={'secondary'}
            disabled={isPending}
          >
            {show2FA ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
