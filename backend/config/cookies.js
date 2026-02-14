import { config } from './env.js';

export const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: config.COOKIE_MAX_AGE,
  path: '/',
};

export const setCookie = (res, name, value, options = {}) => {
  const finalOptions = { ...cookieOptions, ...options };
  res.cookie(name, value, finalOptions);
};

export const clearCookie = (res, name) => {
  res.clearCookie(name, { path: '/' });
};

export default {
  cookieOptions,
  setCookie,
  clearCookie,
};
