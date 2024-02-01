import { auth } from '@/auth';
import { UserInfo } from '@/components/self-defined/auth/user-info';
import React from 'react';

const ServerPage = async () => {
  const session = await auth();
  return <UserInfo user={session?.user} label="🛠️ Server Page" />;
};

export default ServerPage;
