export const AUTH_COOKIES = {
  ACCESS_TOKEN:  "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const REDIS_KEYS = {
  refreshToken:      (userId: string, jti: string) => `refresh:${userId}:${jti}`,
  loginAttempts:     (ip: string)                  => `login_attempts:${ip}`,
  accountLock:       (userId: string)               => `account_lock:${userId}`,
  emailVerify:       (userId: string)               => `email_verify:${userId}`,
  passwordReset:     (userId: string)               => `pwd_reset:${userId}`,
  userTokenSet:      (userId: string)               => `user_tokens:${userId}`,
} as const;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === "production",
  sameSite: (process.env.NODE_ENV === "production" ? "strict" : "lax") as "strict" | "lax" | "none",
  path:     "/",
} as const;

export const ACCESS_TTL_MS  = 15 * 60 * 1000;          // 15 min
export const REFRESH_TTL_MS = 7  * 24 * 60 * 60 * 1000; // 7 days
export const REFRESH_TTL_S  = 7  * 24 * 60 * 60;
