import { Router } from "express";
import * as user             from "../controllers/user.controller.js";
import { authenticate }      from "../middleware/authenticate.js";
import { requireRole, requireOwnership } from "../middleware/authorize.js";
import { validate }          from "../middleware/validate.js";
import { updateProfileSchema, listUsersSchema } from "../validators/user.validator.js";

const router = Router();

router.use(authenticate);

/** GET  /api/users          — admin+ */
router.get("/",     requireRole("admin"), validate(listUsersSchema, "query"), user.listUsers);

/** GET  /api/users/:id      — admin+ */
router.get("/:id",  requireRole("admin"), user.getUserById);

/** PUT  /api/users/:id      — self or admin+ */
router.put(
  "/:id",
  requireOwnership((req) => {
    const id = req.params["id"];
    return Array.isArray(id) ? (id[0] ?? "") : (id ?? "");
  }),
  validate(updateProfileSchema),
  user.updateUser,
);

/** DELETE /api/users/:id   — admin+ */
router.delete("/:id", requireRole("admin"), user.deleteUser);

export default router;
