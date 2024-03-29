// import { auth } from './auth';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

// middleware used to deal with the project route trigger (transfer to the page)
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if trigger /api/auth just stay in the page
  if (isApiAuthRoute) {
    return null; // not to anything
  }

  // check auth before public routes
  if (isAuthRoute) {
    // if trigger 'auth/login', 'auth/register' just stay in the page
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // combine nextUrl with DEFAULT_LOGIN_REDIRECT to get the full url
    }
    return null;
  }

  // if trigger settings page, but not logged in, redirect to login page
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const enCodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${enCodedCallbackUrl}`, nextUrl)
    ); // combine nextUrl with '/auth/login' to get the full url
  }

  return null;
  // // req.auth
  // console.log('route: ', req.nextUrl.pathname);
  // console.log('isLoggedIn: ', isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], // the path to match can invoke the middleware
  // matcher: ['/auth/login'],
};
