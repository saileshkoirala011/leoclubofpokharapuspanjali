/**
 * Axios instance — the single HTTP client used by all frontend API calls.
 *
 * Features:
 *  - Sends cookies automatically (credentials: "include" equivalent)
 *  - Fetches a CSRF token once and attaches it to every mutating request
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

// ── CSRF token (double-submit cookie pattern) ─────────────────────────────────
// The backend requires an `x-csrf-token` header on all mutating requests.
// We fetch the token once (GET /csrf-token) and cache it for the page lifetime.
//
// Circular-loop guard: GET /csrf-token is not a mutating method so the request
// interceptor below won't fire for it. However, the internal POST /auth/refresh
// call (in the response interceptor) IS mutating — to prevent it from
// re-entering the CSRF fetch (which would call api.get again, which on 401
// would call the response interceptor again), we tag internal requests with
// `_skipInterceptors` and bail out early.

const MUTATING_METHODS = new Set(["post", "put", "patch", "delete"]);

// Extended config type used for internal retry/skip flags
type ExtConfig = InternalAxiosRequestConfig & {
  _retry?:            boolean;
  _skipInterceptors?: boolean;
};

let csrfToken: string | null = null;
let csrfFetchPromise: Promise<string> | null = null;

async function fetchCsrfToken(): Promise<string> {
  if (csrfToken) return csrfToken;
  if (!csrfFetchPromise) {
    // Tag this GET so the response interceptor ignores it on 401
    csrfFetchPromise = api
      .get<{ csrfToken: string }>("/csrf-token", {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _skipInterceptors: true,
      } as any)
      .then((res) => {
        csrfToken = res.data.csrfToken;
        csrfFetchPromise = null;
        return csrfToken as string;
      })
      .catch((err) => {
        csrfFetchPromise = null;
        throw err;
      });
  }
  return csrfFetchPromise;
}

// ── Request interceptor: attach CSRF token ────────────────────────────────────
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const cfg = config as ExtConfig;
  // Skip for internal calls and non-browser environments
  if (cfg._skipInterceptors || typeof window === "undefined") return config;

  if (MUTATING_METHODS.has((config.method ?? "").toLowerCase())) {
    try {
      const token = await fetchCsrfToken();
      config.headers.set("x-csrf-token", token);
    } catch {
      // If CSRF fetch fails, proceed anyway — the server will return a clear error
    }
  }
  return config;
});

// ── Response interceptor: silent token refresh on 401 ────────────────────────

let isRefreshing       = false;
let refreshQueue: Array<(token: null) => void> = [];

function flushQueue() {
  refreshQueue.forEach((cb) => cb(null));
  refreshQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as ExtConfig;

    // Skip internal requests and already-retried requests
    if (original?._skipInterceptors) return Promise.reject(error);

    // Only retry once, and only on 401 from non-auth endpoints
    const url = (original?.url ?? "");
    if (
      error.response?.status !== 401 ||
      original?._retry ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
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
      // Tag the refresh call so it doesn't recurse through this interceptor
      await api.post("/auth/refresh", undefined, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _skipInterceptors: true,
      } as any);
      // Bust the CSRF cache so the retried request fetches a fresh token
      csrfToken = null;
      flushQueue();
      return api(original);
    } catch (refreshError) {
      refreshQueue = [];
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

/** GET /admin/users — admin, paginated */
export async function fetchAdminUsers(page = 1, limit = 20) {
  const { data } = await api.get<ApiResult<{
    users: unknown[];
    pagination: { total: number; page: number; limit: number; pages: number };
  }>>(`/admin/users?page=${page}&limit=${limit}`);
  return data.data;
}