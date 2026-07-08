import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHelpers.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

const sendToken = (res, user, message, statusCode = 200) => {
  const token = generateToken({ id: user._id, role: user.role });

  res.cookie("token", token, {
    ...cookieOptions,
    secure: process.env.NODE_ENV === "production",
  });

  return sendSuccess(res, { user, token }, message, statusCode);
};

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const normalizedEmail = String(email || "").trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return next(new ApiError("Email is already registered", 400));
  }

  const user = await User.create({
    name: String(name || "").trim(),
    email: normalizedEmail,
    password,
  });
  return sendToken(res, user, "Registration successful", 201);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const normalizedEmail = String(email || "").trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new ApiError("Invalid email or password", 401));
  }

  return sendToken(res, user, "Login successful");
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return sendSuccess(res, null, "Logout successful");
});

export const getProfile = asyncHandler(async (req, res) => {
  return sendSuccess(res, req.user, "Profile returned");
});
