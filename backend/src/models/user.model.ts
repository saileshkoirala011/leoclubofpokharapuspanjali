import mongoose, { Schema, type Document, type Types } from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { ROLES, type Role } from "../constants/roles.constants.js";

export interface IUser extends Document {
  _id:                    Types.ObjectId;
  name:                   string;
  email:                  string;
  password:               string;
  role:                   Role;
  isEmailVerified:        boolean;
  isActive:               boolean;
  avatar:                 string | null;
  loginAttempts:          number;
  lockUntil:              Date | null;
  passwordResetToken:     string | null;
  passwordResetExpires:   Date | null;
  emailVerifyToken:       string | null;
  lastLoginAt:            Date | null;
  passwordChangedAt:      Date | null;
  createdAt:              Date;
  updatedAt:              Date;
  comparePassword(candidate: string): Promise<boolean>;
  isLocked(): boolean;
  incLoginAttempts(): Promise<void>;
  resetLoginAttempts(): Promise<void>;
}

const userSchema = new Schema<IUser>(
  {
    name:     { type: String, required: [true, "Name is required"],  trim: true, minlength: 2, maxlength: 100 },
    email:    { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true,
                match: [/^\S+@\S+\.\S+$/, "Invalid email"] },
    password: { type: String, required: [true, "Password is required"], minlength: 8, select: false },
    role:            { type: String, enum: Object.values(ROLES), default: ROLES.USER },
    isEmailVerified: { type: Boolean, default: false },
    isActive:        { type: Boolean, default: true },
    avatar:          { type: String,  default: null },
    loginAttempts:   { type: Number,  default: 0 },
    lockUntil:       { type: Date,    default: null },
    passwordResetToken:   { type: String, default: null, select: false },
    passwordResetExpires: { type: Date,   default: null, select: false },
    emailVerifyToken:     { type: String, default: null, select: false },
    lastLoginAt:          { type: Date,   default: null },
    passwordChangedAt:    { type: Date,   default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        // Use bracket notation so TS does not complain about delete on non-optional
        const STRIP = [
          "password", "passwordResetToken", "passwordResetExpires",
          "emailVerifyToken", "loginAttempts", "lockUntil",
        ];
        STRIP.forEach((k) => { delete ret[k]; });
        return ret;
      },
    },
  }
);

// ── Hash password on save ─────────────────────────────────────────────────────
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, env.BCRYPT_ROUNDS);
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// ── Instance methods ──────────────────────────────────────────────────────────
userSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.isLocked = function (): boolean {
  return !!(this.lockUntil && this.lockUntil > new Date());
};

userSchema.methods.incLoginAttempts = async function (): Promise<void> {
  const LOCK_MS = env.LOCKOUT_DURATION_MINUTES * 60 * 1000;
  if (this.lockUntil && this.lockUntil < new Date()) {
    await this.updateOne({ loginAttempts: 1, lockUntil: null });
    return;
  }
  const next = this.loginAttempts + 1;
  const update: Record<string, unknown> = { loginAttempts: next };
  if (next >= env.MAX_LOGIN_ATTEMPTS) update["lockUntil"] = new Date(Date.now() + LOCK_MS);
  await this.updateOne(update);
};

userSchema.methods.resetLoginAttempts = async function (): Promise<void> {
  await this.updateOne({ loginAttempts: 0, lockUntil: null, lastLoginAt: new Date() });
};

// ── Indexes ───────────────────────────────────────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ passwordResetToken: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
