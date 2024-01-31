'use server';

import { signOut } from '@/auth';

export const logout = async () => {
  // this is server action
  await signOut();
};
