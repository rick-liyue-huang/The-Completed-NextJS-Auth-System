// import { auth } from './auth';

import authConfig from './auth.config';
import NextAuth from 'next-auth';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiRoutesPrefix,
  publicRoutes,
  authRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLogged = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutesPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLogged) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLogged && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  // !must on these order to check the routes!

  return null;

  // console.log('ROUTE: ', req.nextUrl.pathname);
  // console.log('IS LOGGED: ', isLogged);
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], // copy from clerk authMiddleware
};
