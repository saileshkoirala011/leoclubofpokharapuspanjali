import { Router } from "express";
import authRoutes    from "./auth.routes.js";
import userRoutes    from "./user.routes.js";
import adminRoutes   from "./admin.routes.js";
import contactRoutes from "./contact.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ success: true, message: "Leo Club Auth API v1" });
});

router.use("/auth",     authRoutes);
router.use("/users",    userRoutes);
router.use("/admin",    adminRoutes);
router.use("/contacts", contactRoutes);

export default router;
