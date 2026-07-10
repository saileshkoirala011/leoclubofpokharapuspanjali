export const ROLES = {
  USER:        "user",
  STAFF:       "staff",
  MANAGER:     "manager",
  ADMIN:       "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Higher number = more privilege */
export const ROLE_HIERARCHY: Record<Role, number> = {
  user:        0,
  staff:       1,
  manager:     2,
  admin:       3,
  super_admin: 4,
};

export const PERMISSIONS = {
  READ_PROFILE:   "read:profile",
  UPDATE_PROFILE: "update:profile",
  CHANGE_PASSWORD:"change:password",
  READ_USERS:     "read:users",
  UPDATE_USERS:   "update:users",
  DELETE_USERS:   "delete:users",
  ASSIGN_ROLES:   "assign:roles",
  MANAGE_ADMINS:  "manage:admins",
  SYSTEM_CONFIG:  "system:config",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  user: [
    PERMISSIONS.READ_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
  ],
  staff: [
    PERMISSIONS.READ_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.READ_USERS,
  ],
  manager: [
    PERMISSIONS.READ_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.READ_USERS,
    PERMISSIONS.UPDATE_USERS,
  ],
  admin: [
    PERMISSIONS.READ_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.READ_USERS,
    PERMISSIONS.UPDATE_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.ASSIGN_ROLES,
  ],
  super_admin: Object.values(PERMISSIONS) as Permission[],
};
