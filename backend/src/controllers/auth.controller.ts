import type { Request, Response } from "express";
import { authService }       from "../services/auth.service.js";
import { jwtService }        from "../services/jwt.service.js";
import { asyncHandler }      from "../utils/asyncHandler.js";
import { sendSuccess }       from "../utils/ApiResponse.js";
import {
  AUTH_COOKIES,
  COOKIE_OPTIONS,
  ACCESS_TTL_MS,
  REFRESH_TTL_MS,
} from "../constants/auth.constants.js";

// ── Cookie helpers ────────────────────────────────────────────────────────────

function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  res.cookie(AUTH_COOKIES.ACCESS_TOKEN, accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TTL_MS,
  });
  res.cookie(AUTH_COOKIES.REFRESH_TOKEN, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge:   REFRESH_TTL_MS,
    path:     "/api/auth/refresh",
  });
}

function clearAuthCookies(res: Response): void {
  res.cookie(AUTH_COOKIES.ACCESS_TOKEN,  "", { ...COOKIE_OPTIONS, expires: new Date(0) });
  res.cookie(AUTH_COOKIES.REFRESH_TOKEN, "", { ...COOKIE_OPTIONS, expires: new Date(0), path: "/api/auth/refresh" });
}

// ── Controllers ───────────────────────────────────────────────────────────────

/** POST /api/auth/register */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, tokens } = await authService.register(req.body);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
  sendSuccess(res, { user, accessToken: tokens.accessToken }, "Registration successful", 201);
});

/** POST /api/auth/login */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, tokens } = await authService.login(req.body);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
  sendSuccess(res, { user, accessToken: tokens.accessToken }, "Login successful");
});

/** POST /api/auth/logout */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.[AUTH_COOKIES.REFRESH_TOKEN] as string | undefined;
  if (refreshToken && req.user) {
    try {
      const payload = await jwtService.verifyRefresh(refreshToken);
      await authService.logout(req.user._id.toString(), payload.jti);
    } catch {
      // Token already expired/invalid — still clear cookies
    }
  }
  clearAuthCookies(res);
  sendSuccess(res, null, "Logged out successfully");
});

/** POST /api/auth/logout-all */
export const logoutAll = asyncHandler(async (req: Request, res: Response) => {
  await authService.logoutAll(req.user!._id.toString());
  clearAuthCookies(res);
  sendSuccess(res, null, "Logged out from all devices");
});

/** POST /api/auth/refresh */
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[AUTH_COOKIES.REFRESH_TOKEN] as string | undefined;
  if (!token) {
    res.status(401).json({ success: false, message: "No refresh token" });
    return;
  }
  const tokens = await authService.refresh(token);
  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
  sendSuccess(res, { accessToken: tokens.accessToken }, "Token refreshed");
});

/** POST /api/auth/forgot-password */
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body);
  // Always 200 — don't leak whether email exists
  sendSuccess(res, null, "If that email exists, a reset link has been sent");
});

/** POST /api/auth/reset-password */
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body);
  sendSuccess(res, null, "Password reset successfully");
});

/** POST /api/auth/change-password  (authenticated) */
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.changePassword(req.user!._id.toString(), req.body);
  clearAuthCookies(res);
  sendSuccess(res, null, "Password changed — please log in again");
});

/** POST /api/auth/verify-email */
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.body.token);
  sendSuccess(res, null, "Email verified successfully");
});

/** GET /api/auth/profile  (authenticated) */
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getProfile(req.user!._id.toString());
  sendSuccess(res, user, "Profile retrieved");
});

/** PUT /api/auth/profile  (authenticated) */
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.updateProfile(req.user!._id.toString(), req.body);
  sendSuccess(res, user, "Profile updated");
});
