import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, authorize("admin"), getUsers);
router.get("/:id", protect, authorize("admin"), getUserById);

export default router;
