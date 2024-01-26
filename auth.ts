import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { UserRole } from '@prisma/client';

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

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

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
      return session;
    },

    async signIn({ user, account }) {
      // allow oauth login without email verified

      if (account?.provider !== 'credentials') {
        return true;
      }

      const existingUser = await getUserById(user.id);

      // prevent login if user not exist or email not verified
      if (!existingUser || !existingUser?.emailVerified) {
        return false; // if user not exist or email not verified, return false, so the user cannot login
      }

      // TODO: add 2FA here
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
