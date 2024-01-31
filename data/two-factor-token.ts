import { db } from '@/lib/db';

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorConfirmationToken.findFirst({
      where: { email: email },
    });

    return twoFactorToken;
  } catch (err) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorConfirmationToken.findUnique({
      where: { token: token },
    });

    return twoFactorToken;
  } catch (err) {
    return null;
  }
};
