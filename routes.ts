// HERE WE DEFINE ALL ROUTES IN OUR APP and used in middleware

/**
 * will be accessible even user is not logged in
 * do not need authentication
 */
export const publicRoutes = ['/', '/auth/new-verification']; // match with the @/lib/email.ts, here from register action, and then go to /auth/new-verification

/**
 * will be accessible only if user is logged in, and can be redirected to settings page
 * need authentication
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error'];

/**
 * starts with this prefix will be for authentication api
 */
export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/settings';
