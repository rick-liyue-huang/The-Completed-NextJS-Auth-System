import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { UserRole } from '@prisma/client';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getAccountByUserId } from './data/account';

// auth config used to separate the pure auth from the orm adapter, so middleware only use the pure auth in auth.config.ts, and orm adapter only used in auth.ts
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    async jwt({ token, user, profile }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log('jwt token', token);
      // console.log('jwt user', user);
      // console.log('jwt profile', profile);
      // token.customField = 'customField';

      console.log('called again');

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name; // update the name in token when click update in settings page
      token.email = existingUser.email; // update the email in token when click update in settings page
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled; // add isTwoFactorEnabled to token
      token.isOAuth = !!existingAccount; // add isOAuth to token

      return token;
    },
    async session({ session, token }) {
      console.log('session token', token);
      // console.log('session session', session);

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean; // match with next-auth.d.ts
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    async signIn({ user, account }) {
      // allow oauth login without email verified

      console.log('user and account: ---', {
        user,
        account,
      });

      if (account?.provider !== 'credentials') {
        return true;
      }

      const existingUser = await getUserById(user.id);

      // prevent login if user not exist or email not verified
      if (!existingUser || !existingUser?.emailVerified) {
        return false; // if user not exist or email not verified, return false, so the user cannot login
      }

      // TODO: add 2FA here
      if (existingUser.isTwoFactorEnabled) {
        // return false;
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        console.log({ twoFactorConfirmation });

        if (!twoFactorConfirmation) {
          return false;
        }

        // delete 2fa confirmation for next login
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }
      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      // when login will create the verified email
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }, // match with prisma/schema.prisma
      });
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
  },
  adapter: PrismaAdapter(db) as any,
  session: { strategy: 'jwt' },
  ...authConfig,
});
