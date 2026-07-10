export interface User {
  _id:             string;
  name:            string;
  email:           string;
  role:            "user" | "staff" | "manager" | "admin" | "super_admin";
  isEmailVerified: boolean;
  isActive:        boolean;
  avatar?:         string | null;
}

export interface Contact {
  _id:       string;
  name:      string;
  email:     string;
  subject:   string;
  message:   string;
  createdAt: string;
}

export interface Pagination {
  total: number;
  page:  number;
  limit: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data:    T;
}

export type NavLink = {
  name: string;
  path: string;
};
