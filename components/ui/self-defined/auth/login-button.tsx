'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

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
    return <span>TODO: implement modal</span>;
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};
