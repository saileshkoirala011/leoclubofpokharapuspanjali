import type { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository.js";
import { asyncHandler }   from "../utils/asyncHandler.js";
import { sendSuccess }    from "../utils/ApiResponse.js";
import { ApiError }       from "../utils/ApiError.js";
import type { IUser }     from "../models/user.model.js";
import type { Role }      from "../constants/roles.constants.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

function toPublic(user: IUser): Record<string, unknown> {
  return user.toJSON() as Record<string, unknown>;
}

function paramId(req: Request): string {
  const id = req.params["id"];
  return Array.isArray(id) ? id[0]! : id!;
}

// ── Controllers ───────────────────────────────────────────────────────────────

/** GET /api/users  — admin */
export const listUsers = asyncHandler(async (req: Request, res: Response) => {
  const page  = Math.max(1,   parseInt(String(req.query["page"]  ?? 1)));
  const limit = Math.min(100, parseInt(String(req.query["limit"] ?? 20)));
  const sort  = String(req.query["sort"] ?? "-createdAt");
  const role  = req.query["role"] as string | undefined;

  const filter = role ? { role } : {};
  const { users, total } = await userRepository.findAll(filter, { page, limit, sort });

  sendSuccess(res, {
    users: users.map(toPublic),
    pagination: { total, page, limit, pages: Math.ceil(total / limit) },
  }, "Users retrieved");
});

/** GET /api/users/:id  — admin */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await userRepository.findById(paramId(req));
  if (!user) throw ApiError.notFound("User not found");
  sendSuccess(res, toPublic(user), "User retrieved");
});

/** PUT /api/users/:id  — self or admin */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, avatar } = req.body as { name?: string; avatar?: string };
  const updated = await userRepository.updateById(paramId(req), { name, avatar });
  if (!updated) throw ApiError.notFound("User not found");
  sendSuccess(res, toPublic(updated), "User updated");
});

/** DELETE /api/users/:id  — admin (soft-delete: deactivate) */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id   = paramId(req);
  const user = await userRepository.findById(id);
  if (!user) throw ApiError.notFound("User not found");

  if (req.user!._id.toString() === id) {
    throw ApiError.badRequest("You cannot deactivate your own account");
  }

  const updated = await userRepository.updateById(id, { isActive: false });
  sendSuccess(res, toPublic(updated!), "User deactivated");
});

/** PUT /api/admin/users/:id/role  — super_admin only */
export const assignRole = asyncHandler(async (req: Request, res: Response) => {
  const { role } = req.body as { role: Role };
  const updated  = await userRepository.updateById(paramId(req), { role });
  if (!updated) throw ApiError.notFound("User not found");
  sendSuccess(res, toPublic(updated), "Role assigned");
});

/** GET /api/admin/users  — alias with stats */
export const adminListUsers = asyncHandler(async (req: Request, res: Response) => {
  const { users, total } = await userRepository.findAll({}, { page: 1, limit: 100 });
  sendSuccess(res, { users: users.map(toPublic), total }, "All users retrieved");
});
