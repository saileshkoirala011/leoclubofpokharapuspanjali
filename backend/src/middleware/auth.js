import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const protect = async (req, res, next) => {
  let token =
    req.cookies?.token ||
    (req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.split(" ")[1]);

  if (!token) return next(new ApiError("Not authorized — no token", 401));

  try {
    const decoded = generateToken.verifyAccess(token);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return next(new ApiError("User not found", 401));
    if (!user.isActive) return next(new ApiError("Account is deactivated", 403));

    req.user = user;
    next();
  } catch (err) {
    const message = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return next(new ApiError(message, 401));
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError("Forbidden — insufficient permissions", 403));
  }
  next();
};
