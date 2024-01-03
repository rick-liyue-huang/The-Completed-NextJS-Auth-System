import { auth } from '@/auth';
/**
 * an array of routes that are public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * an array of routes that are private
 * these routes require authentication
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

/**
 * the prefix for api authenticated routes
 * these routes with this prefix are used for api
 * @type {string}
 */
export const apiRoutesPrefix = '/api/auth';

/**
 * the default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
