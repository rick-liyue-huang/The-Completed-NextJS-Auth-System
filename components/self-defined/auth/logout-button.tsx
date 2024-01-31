'use client';

import { logout } from '@/actions/logout'; // same as import {signOut} from 'next-auth/react';
import React from 'react';

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const handleClick = () => {
    logout();
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};
