// https://authjs.dev/guides/upgrade-to-v5
import NextAuth from 'next-auth';
// import GitHub from 'next-auth/providers/github';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

// auth config used to separate the pure auth from the orm adapter, so middleware only use the pure auth in auth.config.ts, and orm adapter only used in auth.ts
export const {
  handlers: { GET, POST },
  auth,
  signIn, // export to @/actions/login.ts
  signOut,
} = NextAuth({
  callbacks: {},
  // Edge compatibility
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  // providers: [GitHub], // http://localhost:3000/api/auth/providers
});
