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
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import { FormErrors } from './form-errors';
import { FormSuccess } from './form-success';
import { register } from '@/actions/register';

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmitted = (value: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      console.log('value: ', value);
      register(value).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        setSuccess(data.success);
      });
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
                    />
                  </FormControl>
                  <FormMessage className="text-red-300">
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl {...field} id="username">
                    <Input
                      {...field}
                      placeholder="enter username..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300">
                    {form.formState.errors.username?.message}
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
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
