/**
 * Axios instance — the single HTTP client used by all frontend API calls.
 *
 * Features:
 *  - Sends cookies automatically (credentials: "include" equivalent)
 *  - On 401, attempts a silent token refresh then retries the original request once
 *  - On second 401 (refresh also failed), clears auth state and redirects to /admin/login
 */

import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

// ── Base instance ─────────────────────────────────────────────────────────────

export const api: AxiosInstance = axios.create({
  baseURL:         process.env.NEXT_PUBLIC_API_URL ?? "/api",
  withCredentials: true,          // always send HTTP-only cookies
  headers:         { "Content-Type": "application/json" },
  timeout:         15_000,
});

// ── Refresh-token interceptor ─────────────────────────────────────────────────

let isRefreshing       = false;
let refreshQueue: Array<(token: null) => void> = [];

function flushQueue() {
  refreshQueue.forEach((cb) => cb(null));
  refreshQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Only retry once, and only on 401 from non-auth endpoints
    if (
      error.response?.status !== 401 ||
      original._retry ||
      original.url?.includes("/auth/refresh") ||
      original.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue concurrent requests until the refresh completes
      return new Promise((resolve, reject) => {
        refreshQueue.push((token) => {
          if (token === null) resolve(api(original));
          else reject(error);
        });
      });
    }

    original._retry  = true;
    isRefreshing     = true;

    try {
      await api.post("/auth/refresh");
      flushQueue();
      return api(original);                  // retry original request
    } catch (refreshError) {
      refreshQueue = [];
      // Redirect to admin login if running in the browser
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// ── Typed helpers ─────────────────────────────────────────────────────────────

export interface ApiOk<T> {
  success: true;
  message: string;
  data:    T;
}

export type ApiResult<T> = ApiOk<T>;

/** POST /contacts — public contact form submission */
export async function submitContact(payload: {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}): Promise<void> {
  await api.post<ApiResult<null>>("/contacts", payload);
}

/** GET /contacts — admin only */
export async function fetchContacts(page = 1, limit = 15) {
  const { data } = await api.get<ApiResult<{
    contacts:   unknown[];
    pagination: { total: number; page: number; limit: number; pages: number };
  }>>(`/contacts?page=${page}&limit=${limit}`);
  return data.data;
}

/** DELETE /contacts/:id — admin only */
export async function deleteContact(id: string): Promise<void> {
  await api.delete(`/contacts/${id}`);
}

/** GET /admin/users — super admin */
export async function fetchAdminUsers() {
  const { data } = await api.get<ApiResult<{ users: unknown[]; total: number }>>("/admin/users");
  return data.data;
}
