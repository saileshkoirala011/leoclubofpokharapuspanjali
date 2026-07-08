import { Router } from "express";
import { body } from "express-validator";
import { submitContact, listContacts } from "../controllers/contact.controller.js";
import validate from "../middleware/validate.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("message").trim().isLength({ min: 5 }).withMessage("Message must be at least 5 characters"),
  ],
  validate,
  submitContact
);

router.get("/", protect, authorize("admin"), listContacts);

export default router;
