'use client';

import React from 'react';
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

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitted = (value: z.infer<typeof LoginSchema>) => {
    console.log('value: ', value);
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
          <div className="space-x-4">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl {...field} id="email">
                    <Input {...field} placeholder="enter email..." />
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
                    <Input {...field} placeholder="enter password..." />
                  </FormControl>
                  <FormMessage className="text-red-300">
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message="" />
          <FormErrors message={''} />
          <Button type="submit" className="w-full" variant={'secondary'}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
