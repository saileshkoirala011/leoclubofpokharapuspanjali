import type { Types } from "mongoose";
import type { Role, Permission } from "../constants/roles.constants.js";

export interface JwtAccessPayload {
  sub:   string; // user _id
  email: string;
  role:  Role;
  jti:   string; // unique token id — used for revocation
  iat?:  number;
  exp?:  number;
}

export interface JwtRefreshPayload {
  sub: string; // user _id
  jti: string; // must match the key stored in Redis
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken:       string;
  refreshToken:      string;
  accessExpiresAt:   Date;
  refreshExpiresAt:  Date;
}

export interface RegisterInput {
  name:     string;
  email:    string;
  password: string;
}

export interface LoginInput {
  email:    string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token:    string;
  password: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword:     string;
}

export interface UpdateProfileInput {
  name?:   string;
  avatar?: string | null;
}

export interface AuthenticatedUser {
  _id:             Types.ObjectId;
  name:            string;
  email:           string;
  role:            Role;
  isEmailVerified: boolean;
  isActive:        boolean;
  permissions:     Permission[];
}
