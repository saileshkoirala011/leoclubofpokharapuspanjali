import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHelpers.js";
import { registerUser, authenticateUser, issueTokens } from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

const IS_PROD = process.env.NODE_ENV === "production";

const ACCESS_COOKIE = "token";
const REFRESH_COOKIE = "refreshToken";

const cookieBase = {
  httpOnly: true,
  sameSite: IS_PROD ? "strict" : "lax",
  secure: IS_PROD,
  path: "/",
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie(ACCESS_COOKIE, accessToken, {
    ...cookieBase,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...cookieBase,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/api/auth/refresh",
  });
};

const clearAuthCookies = (res) => {
  res.cookie(ACCESS_COOKIE, "", { ...cookieBase, expires: new Date(0) });
  res.cookie(REFRESH_COOKIE, "", { ...cookieBase, expires: new Date(0), path: "/api/auth/refresh" });
};

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  const { accessToken, refreshToken } = issueTokens(user);
  setAuthCookies(res, accessToken, refreshToken);
  return sendSuccess(res, { user, accessToken }, "Registration successful", 201);
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const user = await authenticateUser(req.body);
  const { accessToken, refreshToken } = issueTokens(user);
  setAuthCookies(res, accessToken, refreshToken);
  return sendSuccess(res, { user, accessToken }, "Login successful");
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  clearAuthCookies(res);
  return sendSuccess(res, null, "Logout successful");
});

// POST /api/auth/refresh
export const refresh = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (!token) return next(new ApiError("No refresh token", 401));

  let decoded;
  try {
    decoded = generateToken.verifyRefresh(token);
  } catch {
    return next(new ApiError("Refresh token expired or invalid", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) return next(new ApiError("User not found or inactive", 401));

  const { accessToken, refreshToken } = issueTokens(user);
  setAuthCookies(res, accessToken, refreshToken);
  return sendSuccess(res, { accessToken }, "Token refreshed");
});

// GET /api/auth/profile
export const getProfile = asyncHandler(async (req, res) => {
  return sendSuccess(res, req.user, "Profile returned");
});
