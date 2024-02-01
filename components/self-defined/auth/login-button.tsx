'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { LoginForm } from './login-form';

interface Props {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: Props) => {
  const router = useRouter();
  const handleClick = () => {
    console.log('Login Clicked');
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return (
      <div>
        <Dialog>
          <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
          <DialogContent className="p-0 w-auto bg-red-300">
            <LoginForm />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};
