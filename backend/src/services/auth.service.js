import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";
import logger from "../utils/logger.js";

/**
 * Register a new user.
 * Throws ApiError if email already exists.
 */
export const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) throw new ApiError("Email is already registered", 409);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  logger.info(`New user registered: ${normalizedEmail}`);
  return user;
};

/**
 * Authenticate a user by email + password.
 * Throws ApiError on invalid credentials.
 */
export const authenticateUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError("Invalid email or password", 401);
  }

  if (user.isActive === false) {
    throw new ApiError("Account is deactivated. Contact support.", 403);
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  logger.info(`User logged in: ${normalizedEmail}`);
  return user;
};

/**
 * Generate access + refresh tokens for a user.
 */
export const issueTokens = (user) => {
  const accessToken = generateToken.access({ id: user._id, role: user.role });
  const refreshToken = generateToken.refresh({ id: user._id });
  return { accessToken, refreshToken };
};
