import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHelpers.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort("name");
  return sendSuccess(res, users, "Users retrieved");
});

export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  return sendSuccess(res, user, "User returned");
});
