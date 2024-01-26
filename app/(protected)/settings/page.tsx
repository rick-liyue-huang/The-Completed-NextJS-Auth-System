import React from 'react';
import { auth } from '@/auth';
import { signOut } from '@/auth';

const SettingsPage = async () => {
  const session = await auth();
  // if auth login, will get the session from auth
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut(); // import from auth
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
