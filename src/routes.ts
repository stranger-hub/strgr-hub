/**
 * Array of routes accessible to public
 * These routes don't require auth
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
    "/about",
    "/policies",
];

/**
 * Array of routes used for authectication
 * These routes will redirect logged in user to either profile or settings page
 * @type {string[]}
 */
export const authRoutes : string[]= [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];


/**
 * Prefix for API auth routes
 * Routes with this prefix are used for api authentication
 * @type {string}
 */
export const apiAuthPrefix : string= "/api/auth";


/**
 * The default redirect for login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT : string= "/profile";