'use client';

import React, { useTransition } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settings } from '@/actions/settings';
import { useSession } from 'next-auth/react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { SettingsSchema } from '@/schemas';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentUser } from '@/hooks';
import { FormSuccess } from '@/components/self-defined/auth/form-success';
import { FormErrors } from '@/components/self-defined/auth/form-errors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { UserRole } from '@prisma/client';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  const [success, setSuccess] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  const handleSubmitted = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          // update();
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            update();
          }
        })
        .catch((err) => console.log('something wrong with settings', err));
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-serif text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onClick={form.handleSubmit(handleSubmitted)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        placeholder="enter name..."
                        // disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && ( // it is login by email and password
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            {...field}
                            placeholder="enter email..."
                            // disabled={isPending}
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            {...field}
                            placeholder="enter password..."
                            // disabled={isPending}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="newPassword">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="newPassword"
                            {...field}
                            placeholder="enter new password..."
                            // disabled={isPending}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-1">
                        <FormLabel htmlFor="isTwoFactorEnabled">
                          <FormDescription>
                            Two Factor Authentication
                          </FormDescription>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* <FormSuccess message={success} /> */}
            <FormErrors message={error} />
            <Button variant={'secondary'} type="submit" disabled={isPending}>
              Confirm
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;

{
  /* {JSON.stringify(user)}
      <form
      // action={async () => {
      //   'use server';
      //   await signOut(); // import from auth
      // }}
      >
      </form> */
}
