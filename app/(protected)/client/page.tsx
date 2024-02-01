'use client';

import { auth } from '@/auth';
import { UserInfo } from '@/components/self-defined/auth/user-info';
import { useCurrentUser } from '@/hooks';
import React from 'react';

const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfo user={user} label="🛠️ Client Page" />;
};

export default ClientPage;
