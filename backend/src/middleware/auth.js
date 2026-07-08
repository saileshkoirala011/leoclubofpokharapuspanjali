import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/env.js";

const protect = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ApiError("Not authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new ApiError("User not found", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError("Not authorized, token invalid", 401));
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError("Forbidden", 403));
  }

  next();
};

export { protect, authorize };
