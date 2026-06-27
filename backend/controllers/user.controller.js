import User from '../models/user.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendNotFound } from '../utils/responseHelpers.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  sendSuccess(res, { count: users.length, data: users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return sendNotFound(res, 'User');
  sendSuccess(res, { data: user });
});

export const updateUser = asyncHandler(async (req, res) => {
  const updates = req.body;
  delete updates.password;
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
  if (!user) return sendNotFound(res, 'User');
  sendSuccess(res, { message: 'User updated', data: user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return sendNotFound(res, 'User');
  sendSuccess(res, { message: 'User deleted' });
});
