import { Router } from "express";
import * as auth         from "../controllers/auth.controller.js";
import { authenticate }  from "../middleware/authenticate.js";
import { authLimiter, resetLimiter } from "../middleware/rateLimiter.js";
import { validate }      from "../middleware/validate.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  verifyEmailSchema,
} from "../validators/auth.validator.js";
import { updateProfileSchema } from "../validators/user.validator.js";

const router = Router();

// ── Public ────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered — verification email sent
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user: { $ref: '#/components/schemas/AuthUser' }
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ApiError' }
 *       409:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ApiError' }
 *       429:
 *         description: Too many requests
 */
router.post("/register", authLimiter, validate(registerSchema), auth.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in and receive HTTP-only auth cookies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful — sets access_token and refresh_token cookies
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user: { $ref: '#/components/schemas/AuthUser' }
 *       401:
 *         description: Invalid credentials or account locked
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ApiError' }
 *       429:
 *         description: Too many login attempts
 */
router.post("/login",    authLimiter, validate(loginSchema),    auth.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Silently refresh the access token using the refresh_token cookie
 *     responses:
 *       200:
 *         description: New access_token cookie set
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ApiSuccess' }
 *       401:
 *         description: Missing or invalid refresh token
 */
router.post("/refresh",  auth.refresh);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     tags: [Auth]
 *     summary: Verify email address with the token from the verification email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token: { type: string, example: "abc123verifytoken" }
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post("/verify-email", validate(verifyEmailSchema), auth.verifyEmail);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request a password reset email (always returns 200 to prevent email enumeration)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: "sailesh@example.com" }
 *     responses:
 *       200:
 *         description: If the email exists a reset link has been sent
 *       429:
 *         description: Too many requests
 */
router.post("/forgot-password", resetLimiter, validate(forgotPasswordSchema), auth.forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password using the token from the reset email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token:    { type: string }
 *               password: { type: string, minLength: 8, example: "NewSecure123!" }
 *     responses:
 *       200:
 *         description: Password reset — all sessions revoked
 *       400:
 *         description: Invalid or expired token
 *       429:
 *         description: Too many requests
 */
router.post("/reset-password", resetLimiter, validate(resetPasswordSchema), auth.resetPassword);

// ── Authenticated ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Log out — revokes current refresh token and clears cookies
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out
 *       401:
 *         description: Not authenticated
 */
router.post("/logout",      authenticate, auth.logout);

/**
 * @swagger
 * /auth/logout-all:
 *   post:
 *     tags: [Auth]
 *     summary: Log out from all devices — revokes all refresh tokens
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: All sessions revoked
 *       401:
 *         description: Not authenticated
 */
router.post("/logout-all",  authenticate, auth.logoutAll);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     tags: [Auth]
 *     summary: Change password (requires current password)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword: { type: string }
 *               newPassword:     { type: string, minLength: 8 }
 *     responses:
 *       200:
 *         description: Password changed — all sessions revoked
 *       400:
 *         description: Current password incorrect or same as new
 *       401:
 *         description: Not authenticated
 */
router.post("/change-password", authenticate, validate(changePasswordSchema), auth.changePassword);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Get the current authenticated user's profile
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccess'
 *                 - type: object
 *                   properties:
 *                     data: { $ref: '#/components/schemas/AuthUser' }
 *       401:
 *         description: Not authenticated
 *   put:
 *     tags: [Auth]
 *     summary: Update the current user's profile (name, avatar)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:   { type: string, example: "Sailesh K." }
 *               avatar: { type: string, nullable: true }
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Not authenticated
 */
router.get("/profile",  authenticate, auth.getProfile);
router.put("/profile",  authenticate, validate(updateProfileSchema), auth.updateProfile);

export default router;
