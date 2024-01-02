'use client';

import React, { useTransition, useState } from 'react';
import { LoginCardWrapper } from '@/components/auth/login-card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
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
import { FormError } from '@/components/form-clue/form-error';
import { FormSuccess } from '@/components/form-clue/form-success';
import * as zod from 'zod';
import { login } from '@/actions/login';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: zod.infer<typeof LoginSchema>) => {
    // console.log(values);

    setError('');
    setSuccess('');
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        console.log(data);
      });
      // pass the values to the login action to handle the login process
    });
  };
  return (
    <LoginCardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Do not have an Account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl id="email">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="please input your email..."
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl id="password">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="need your password..."
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full"
            variant={'custom'}
            disabled={isPending}
          >
            Log In
          </Button>
        </form>
      </Form>
    </LoginCardWrapper>
  );
};
