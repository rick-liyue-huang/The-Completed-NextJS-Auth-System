'use client';

import React, { useState, useTransition } from 'react';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/actions/login';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { FormErrors } from '@/components/auth/FormErrors';
import { FormSuccess } from './FormSuccess';

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const onHandlerSubmitted = (value: zod.infer<typeof LoginSchema>) => {
    // console.log(value);

    setError('');
    setSuccess('');
    startTransition(() => {
      // good for loading
      login(value).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Login Page"
      backButtonLabel="Have not yet an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onHandlerSubmitted)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="email..."
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>This is your id here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="password..."
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>This is your path to auth.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormErrors message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" variant={'customlogin'}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
