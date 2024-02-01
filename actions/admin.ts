'use server';

import { UserRole } from '@prisma/client';
import { currentRole } from '@/lib/auth';

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return {
      success: 'success, you are admin',
    };
  } else {
    return {
      error: 'fail, you are not admin',
    };
  }
};
