export const SESSION_CONFIG = {
    EXPIRY_DAYS : 7,
    COOKIE_NAME : 'session_id',
    COOKIE_OPTIONS : {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : process.env.NODE_ENV === 'production'? 'none' as const : 'lax' as const,
        path : '/',
        maxAge : 7 * 24 *60 * 60 * 1000,
    }
}