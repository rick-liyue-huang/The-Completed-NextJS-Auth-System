'use client';

import React, { useState, useTransition } from 'react';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { register } from '@/actions/register';

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

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<zod.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const onHandlerSubmitted = (value: zod.infer<typeof RegisterSchema>) => {
    // console.log(value);

    setError('');
    setSuccess('');
    startTransition(() => {
      // good for loading
      register(value).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Register Page"
      backButtonLabel="Already have one account?"
      backButtonHref="/auth/login"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="username..."
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormDescription>This is your alias here.</FormDescription>
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
          <Button type="submit" className="w-full" variant={'customregister'}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
