import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../config/env.js', () => ({
  config: {
    NODE_ENV: 'development',
    COOKIE_MAX_AGE: 604800000,
  },
}));

const { login, logout } = await import('../auth.controller.js');

describe('auth controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
      clearCookie: vi.fn().mockReturnThis(),
    };
  });

  describe('login', () => {
    it('returns 400 when username is missing', async () => {
      req.body = { password: 'admin123' };
      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Username and password are required',
        }),
      );
    });

    it('returns 400 when password is missing', async () => {
      req.body = { username: 'admin' };
      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Username and password are required',
        }),
      );
    });

    it('returns 401 for invalid credentials', async () => {
      req.body = { username: 'wrong', password: 'wrong' };
      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Invalid credentials',
        }),
      );
    });

    it('returns 200 and sets cookie for valid credentials', async () => {
      req.body = { username: 'admin', password: 'admin123' };
      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.cookie).toHaveBeenCalledWith(
        'authToken',
        expect.stringContaining('mock-token-'),
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 604800000,
        }),
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, message: 'Login successful' }),
      );
    });

    it('sets secure cookie flag based on NODE_ENV', async () => {
      req.body = { username: 'admin', password: 'admin123' };
      await login(req, res);

      const cookieOptions = res.cookie.mock.calls[0][2];
      expect(cookieOptions.secure).toBe(false);
    });
  });

  describe('logout', () => {
    it('clears authToken cookie and returns success', () => {
      logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith('authToken');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Logged out successfully',
        }),
      );
    });
  });
});
