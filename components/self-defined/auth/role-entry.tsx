'use client';

import { UserRole } from '@prisma/client';
import React from 'react';
import { useCurrentRole } from '@/hooks';
import { FormErrors } from '@/components/self-defined/auth/form-errors';

interface RoleEntryProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export const RoleEntry = ({ children, allowedRole }: RoleEntryProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormErrors message="You have no the permission to visit here, Sorry" />
    );
  }

  return <div>{children}</div>;
};
