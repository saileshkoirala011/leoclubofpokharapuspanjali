import type { FilterQuery, UpdateQuery } from "mongoose";
import { User, type IUser } from "../models/user.model.js";

/**
 * All MongoDB access is isolated here.
 * Services call the repository — never Mongoose directly.
 * This keeps the DB layer swappable and testable via mocks.
 */
export class UserRepository {
  async findById(id: string, select?: string): Promise<IUser | null> {
    const q = User.findById(id);
    if (select) q.select(select);
    return q.exec();
  }

  async findByEmail(email: string, select?: string): Promise<IUser | null> {
    const q = User.findOne({ email: email.toLowerCase().trim() });
    if (select) q.select(select);
    return q.exec();
  }

  async findByResetToken(hashedToken: string): Promise<IUser | null> {
    return User.findOne({
      passwordResetToken:   hashedToken,
      passwordResetExpires: { $gt: new Date() },
    })
      .select("+passwordResetToken +passwordResetExpires")
      .exec();
  }

  async findByEmailVerifyToken(hashedToken: string): Promise<IUser | null> {
    return User.findOne({ emailVerifyToken: hashedToken })
      .select("+emailVerifyToken")
      .exec();
  }

  async create(data: {
    name:              string;
    email:             string;
    password:          string;
    emailVerifyToken?: string;
  }): Promise<IUser> {
    return User.create(data);
  }

  async updateById(id: string, update: UpdateQuery<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).exec();
  }

  async findAll(
    filter:  FilterQuery<IUser> = {},
    options: { page: number; limit: number; sort?: string } = { page: 1, limit: 20 },
  ): Promise<{ users: IUser[]; total: number }> {
    const skip  = (options.page - 1) * options.limit;
    const sort  = options.sort ?? "-createdAt";
    const [users, total] = await Promise.all([
      User.find(filter).sort(sort).skip(skip).limit(options.limit).exec(),
      User.countDocuments(filter).exec(),
    ]);
    return { users, total };
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return !!(await User.exists({ email: email.toLowerCase().trim() }));
  }
}

export const userRepository = new UserRepository();
