'use client';

import React from 'react';
import { auth } from '@/auth';
// import { signOut } from '@/auth';
import { useSession, signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks';
import { logout } from '@/actions/logout';
import { LogoutButton } from '@/components/self-defined/auth/logout-button';

const SettingsPage = () => {
  // const session = await auth();
  // if auth login, will get the session from auth
  const session = useSession();
  const user = useCurrentUser();

  const handleSignOut = () => {
    // signOut();
    logout(); // use server action
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <LogoutButton>
        <button type="submit" onClick={handleSignOut}>
          Sign Out
        </button>
      </LogoutButton>
    </div>
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
