import { Router } from "express";
import * as auth         from "../controllers/auth.controller.js";
import { authenticate }  from "../middleware/authenticate.js";
import { validate }      from "../middleware/validate.js";
import { authLimiter, resetLimiter } from "../middleware/rateLimiter.js";
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
router.post("/register",       authLimiter,  validate(registerSchema),       auth.register);
router.post("/login",          authLimiter,  validate(loginSchema),           auth.login);
router.post("/refresh",                                                        auth.refresh);
router.post("/forgot-password",resetLimiter, validate(forgotPasswordSchema), auth.forgotPassword);
router.post("/reset-password", resetLimiter, validate(resetPasswordSchema),  auth.resetPassword);
router.post("/verify-email",                 validate(verifyEmailSchema),     auth.verifyEmail);

// ── Authenticated ─────────────────────────────────────────────────────────────
router.use(authenticate);

router.post("/logout",          auth.logout);
router.post("/logout-all",      auth.logoutAll);
router.post("/change-password", validate(changePasswordSchema), auth.changePassword);
router.get ("/profile",         auth.getProfile);
router.put ("/profile",         validate(updateProfileSchema),  auth.updateProfile);

export default router;
