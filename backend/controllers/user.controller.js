import mongoose from 'mongoose';
import User from '../models/user.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendNotFound } from '../utils/responseHelpers.js';

<<<<<<< HEAD
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
<<<<<<< HEAD
  } catch (error) {
    console.error('getAllUsers error:', error);
    next(error);
=======
  } catch (_error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
>>>>>>> origin/devin/1782546719-security-fixes
  }
};

export const getUserById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
<<<<<<< HEAD
  } catch (error) {
    console.error('getUserById error:', error);
    next(error);
=======
  } catch (_error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
>>>>>>> origin/devin/1782546719-security-fixes
  }
};

export const updateUser = async (req, res, next) => {
  try {
<<<<<<< HEAD
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }
    const updates = req.body;
    delete updates.password;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User updated', data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('updateUser error:', error);
    next(error);
=======
    const { name, email } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    // password and role changes are not allowed through this endpoint
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User updated', data: user });
  } catch (_error) {
    res.status(500).json({ success: false, message: 'Error updating user' });
>>>>>>> origin/devin/1782546719-security-fixes
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted' });
<<<<<<< HEAD
  } catch (error) {
    console.error('deleteUser error:', error);
    next(error);
=======
  } catch (_error) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
>>>>>>> origin/devin/1782546719-security-fixes
  }
};
=======
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
>>>>>>> origin/devin/1782546958-refactor-shared-utilities
