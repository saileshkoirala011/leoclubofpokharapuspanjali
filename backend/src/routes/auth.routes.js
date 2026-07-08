import { Router } from "express";
import { body } from "express-validator";
import { register, login, logout, refresh, getProfile } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name too long"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/).withMessage("Password must contain at least one number"),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/profile", protect, getProfile);

export default router;
