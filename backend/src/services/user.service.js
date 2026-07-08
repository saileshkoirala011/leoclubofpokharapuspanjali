import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const getAllUsers = async () => {
  return User.find().select("-password").sort("name").lean();
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password").lean();
  if (!user) throw new ApiError("User not found", 404);
  return user;
};
