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
    /*
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.emailVerified) {
        return false; // if user not exist or email not verified, return false, so the user cannot login
      }
      return true;
    },
    */
  },
  adapter: PrismaAdapter(db) as any,
  session: { strategy: 'jwt' },
  ...authConfig,
});
