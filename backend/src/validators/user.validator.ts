import { z } from "zod";
import { ROLES } from "../constants/roles.constants.js";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2,   "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim()
    .optional(),
  avatar: z
    .string()
    .url("Avatar must be a valid URL")
    .max(500, "Avatar URL too long")
    .nullable()
    .optional(),
});

export const listUsersSchema = z.object({
  page:  z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort:  z.string().optional(),
  role:  z.enum(Object.values(ROLES) as [string, ...string[]]).optional(),
});

export const assignRoleSchema = z.object({
  role: z.enum(Object.values(ROLES) as [string, ...string[]]),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ListUsersInput     = z.infer<typeof listUsersSchema>;
export type AssignRoleInput    = z.infer<typeof assignRoleSchema>;
