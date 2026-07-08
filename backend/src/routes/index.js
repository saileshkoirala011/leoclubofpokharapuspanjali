import { Router } from "express";
import authRoutes from "./auth.routes.js";
import contactRoutes from "./contact.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API v1 Working",
  });
});

router.use("/auth", authRoutes);
router.use("/contacts", contactRoutes);
router.use("/users", userRoutes);

export default router;
