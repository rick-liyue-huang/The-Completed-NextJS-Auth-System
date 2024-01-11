'use client';

import React from 'react';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onHandlerSubmitted = (value: zod.infer<typeof LoginSchema>) => {
    console.log(value);
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
                    <Input placeholder="email..." {...field} type="email" />
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
          <FormErrors message={''} />
          <FormSuccess message="" />
          <Button type="submit" className="w-full" variant={'customlogin'}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
