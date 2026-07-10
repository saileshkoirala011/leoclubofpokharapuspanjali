import { userRepository } from "../repositories/user.repository.js";
import { jwtService }    from "./jwt.service.js";
import { emailService }  from "./email.service.js";
import { getRedis }      from "../config/redis.js";
import { env }           from "../config/env.js";
import { REDIS_KEYS }    from "../constants/auth.constants.js";
import { ROLE_PERMISSIONS } from "../constants/roles.constants.js";
import { ApiError }      from "../utils/ApiError.js";
import { generateSecureToken, hashToken } from "../utils/crypto.js";
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  TokenPair,
  AuthenticatedUser,
  UpdateProfileInput,
} from "../types/auth.types.js";
import type { IUser }    from "../models/user.model.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

function toAuthUser(user: IUser): AuthenticatedUser {
  return {
    _id:             user._id,
    name:            user.name,
    email:           user.email,
    role:            user.role,
    isEmailVerified: user.isEmailVerified,
    isActive:        user.isActive,
    permissions:     ROLE_PERMISSIONS[user.role] ?? [],
  };
}

// ── Service ───────────────────────────────────────────────────────────────────

export class AuthService {

  // ── Register ───────────────────────────────────────────────────────────────

  async register(input: RegisterInput): Promise<{ user: AuthenticatedUser; tokens: TokenPair }> {
    if (await userRepository.existsByEmail(input.email)) {
      throw ApiError.conflict("An account with this email already exists");
    }

    const rawToken   = generateSecureToken();
    const hashedTok  = hashToken(rawToken);

    const created = await userRepository.create({
      name:             input.name,
      email:            input.email,
      password:         input.password,
      emailVerifyToken: hashedTok,
    });

    // Send verification email (non-blocking — failure won't stop registration)
    await emailService.sendVerification(created.email, rawToken, created.name);

    const tokens = await jwtService.issueTokenPair(created);
    return { user: toAuthUser(created), tokens };
  }

  // ── Login ──────────────────────────────────────────────────────────────────

  async login(input: LoginInput): Promise<{ user: AuthenticatedUser; tokens: TokenPair }> {
    const user = await userRepository.findByEmail(input.email, "+password +loginAttempts +lockUntil");

    if (!user) throw ApiError.unauthorized("Invalid email or password");
    if (!user.isActive) throw ApiError.forbidden("Account is deactivated");

    if (user.isLocked()) {
      throw ApiError.tooManyRequests(
        `Account locked. Try again after ${env.LOCKOUT_DURATION_MINUTES} minutes.`
      );
    }

    const valid = await user.comparePassword(input.password);
    if (!valid) {
      await user.incLoginAttempts();
      throw ApiError.unauthorized("Invalid email or password");
    }

    await user.resetLoginAttempts();

    const tokens = await jwtService.issueTokenPair(user);
    return { user: toAuthUser(user), tokens };
  }

  // ── Logout ─────────────────────────────────────────────────────────────────

  async logout(userId: string, jti: string): Promise<void> {
    await jwtService.revokeRefresh(userId, jti);
  }

  async logoutAll(userId: string): Promise<void> {
    await jwtService.revokeAllRefresh(userId);
  }

  // ── Refresh tokens ─────────────────────────────────────────────────────────

  async refresh(refreshToken: string): Promise<TokenPair> {
    const payload = await jwtService.verifyRefresh(refreshToken);
    const user    = await userRepository.findById(payload.sub);

    if (!user || !user.isActive) throw ApiError.unauthorized("User not found or inactive");

    return jwtService.issueTokenPair(user);
  }

  // ── Verify email ───────────────────────────────────────────────────────────

  async verifyEmail(token: string): Promise<void> {
    const hashed = hashToken(token);
    const user   = await userRepository.findByEmailVerifyToken(hashed);

    if (!user) throw ApiError.badRequest("Invalid or expired verification token");

    await userRepository.updateById(user._id.toString(), {
      isEmailVerified:  true,
      emailVerifyToken: null,
    });
  }

  // ── Forgot password ────────────────────────────────────────────────────────

  async forgotPassword(input: ForgotPasswordInput): Promise<void> {
    const user = await userRepository.findByEmail(input.email);
    // Always return 200 — don't leak whether the email exists
    if (!user || !user.isActive) return;

    const raw    = generateSecureToken();
    const hashed = hashToken(raw);
    const expiry = new Date(Date.now() + env.RESET_TOKEN_EXPIRES_MINUTES * 60 * 1000);

    await userRepository.updateById(user._id.toString(), {
      passwordResetToken:   hashed,
      passwordResetExpires: expiry,
    });

    await emailService.sendPasswordReset(user.email, raw, user.name);
  }

  // ── Reset password ─────────────────────────────────────────────────────────

  async resetPassword(input: ResetPasswordInput): Promise<void> {
    const hashed = hashToken(input.token);
    const user   = await userRepository.findByResetToken(hashed);

    if (!user) throw ApiError.badRequest("Invalid or expired reset token");

    await userRepository.updateById(user._id.toString(), {
      password:             input.password,
      passwordResetToken:   null,
      passwordResetExpires: null,
    });

    // Invalidate all sessions after password change
    await jwtService.revokeAllRefresh(user._id.toString());
    await emailService.sendPasswordChanged(user.email, user.name);
  }

  // ── Change password ────────────────────────────────────────────────────────

  async changePassword(userId: string, input: ChangePasswordInput): Promise<void> {
    const user = await userRepository.findById(userId, "+password");
    if (!user) throw ApiError.notFound("User not found");

    const valid = await user.comparePassword(input.currentPassword);
    if (!valid) throw ApiError.badRequest("Current password is incorrect");

    if (input.currentPassword === input.newPassword) {
      throw ApiError.badRequest("New password must differ from current password");
    }

    await userRepository.updateById(userId, { password: input.newPassword });

    // Revoke all sessions so other devices are forced to re-login
    await jwtService.revokeAllRefresh(userId);
    await emailService.sendPasswordChanged(user.email, user.name);
  }

  // ── Update profile ─────────────────────────────────────────────────────────

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<AuthenticatedUser> {
    const updates: Record<string, unknown> = {};
    if (input.name   !== undefined) updates["name"]   = input.name;
    if (input.avatar !== undefined) updates["avatar"] = input.avatar;

    const updated = await userRepository.updateById(userId, updates);
    if (!updated) throw ApiError.notFound("User not found");
    return toAuthUser(updated);
  }

  // ── Get profile ────────────────────────────────────────────────────────────

  async getProfile(userId: string): Promise<AuthenticatedUser> {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.notFound("User not found");
    return toAuthUser(user);
  }
}

export const authService = new AuthService();
