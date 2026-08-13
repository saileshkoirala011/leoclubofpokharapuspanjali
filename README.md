# Leo Club of Pokhara Puspanjali

Official website and admin platform for the **Leo Club of Pokhara Puspanjali** — a youth-driven community service organization in Pokhara, Nepal.

**Live site:** [leoclubpuspanjali.org](https://leoclubpuspanjali.org) &nbsp;|&nbsp; **Tagline:** Lead. Serve. Inspire.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [API Reference](#api-reference)
  - [Authentication](#authentication-endpoints)
  - [Users](#user-endpoints)
  - [Admin](#admin-endpoints)
  - [Contacts](#contact-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Roles & Permissions](#roles--permissions)
- [Frontend Pages](#frontend-pages)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)

---

## Overview

A full-stack monorepo comprising a public-facing website and a role-protected admin dashboard. The frontend is a Next.js 15 app with server-side rendering; the backend is an Express 5 REST API backed by MongoDB and Redis.

Key features:

- Public website with hero, team, events, gallery, testimonials, FAQ, and contact sections
- JWT-based authentication with HTTP-only cookies and silent refresh
- Role-based access control with five privilege levels
- Admin dashboard for user management and contact submissions
- Email flows for account verification and password reset
- Rate limiting, account lockout, NoSQL injection prevention, and HPP protection
- Full CI/CD via GitHub Actions → Vercel (frontend) + Render (backend)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 15 (App Router) |
| Frontend language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| HTTP client | Axios (with refresh interceptor) |
| Frontend validation | Zod 4 |
| Backend runtime | Node.js 20+ |
| Backend framework | Express 5 |
| Backend language | TypeScript 5 |
| Database | MongoDB (Mongoose 8) |
| Cache / sessions | Redis (ioredis 5) |
| Authentication | JWT (jsonwebtoken) + HTTP-only cookies |
| Password hashing | bcryptjs |
| Email | Nodemailer (SMTP) |
| Logging | Pino + pino-http |
| Validation | Zod 3 (backend) |
| Testing (backend) | Vitest + Supertest |
| Testing (E2E) | Playwright |
| Deployment | Vercel (frontend) · Render (backend) |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Browser                         │
│  Next.js 15 App Router (SSR + Client Components)    │
│  /api/* → rewritten to Express backend              │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP (cookie-based JWT)
┌──────────────────────▼──────────────────────────────┐
│         Express 5 REST API  (port 5000)             │
│  Helmet · CORS · Mongo Sanitize · HPP · Rate Limit  │
│                                                     │
│  Routes:  /api/auth  /api/users  /api/admin         │
│           /api/contacts                             │
└──────┬─────────────────────────────────┬────────────┘
       │                                 │
┌──────▼──────┐                  ┌───────▼──────┐
│  MongoDB    │                  │    Redis     │
│  (Mongoose) │                  │  (ioredis)   │
│  Users      │                  │  Refresh     │
│  Contacts   │                  │  token store │
└─────────────┘                  └──────────────┘
```

The Next.js rewrite in `next.config.ts` proxies all `/api/*` requests to the Express server during development, so the frontend never exposes the backend origin to the browser.

---

## Project Structure

```
leoclubofpokharapuspanjali/
├── frontend/                     # Next.js 15 application
│   ├── app/
│   │   ├── (public)/             # Public route group (Navbar + Footer)
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── events/
│   │   │   ├── gallery/
│   │   │   ├── team/
│   │   │   └── verify-email/
│   │   ├── admin/                # Admin area (no public nav)
│   │   │   ├── page.tsx          # Admin dashboard
│   │   │   └── login/
│   │   ├── layout.tsx            # Root layout (AuthProvider, SpeedInsights)
│   │   └── globals.css
│   ├── components/
│   │   ├── home/                 # Hero, Who, Work, TeamSection, Leader,
│   │   │   │                     # Testimonials, FAQ, Gallery, Contact, Pricing
│   │   ├── admin/                # AdminGuard
│   │   ├── layout/               # Navbar, Navigation, Footer
│   │   └── ui/                   # Shared UI primitives
│   ├── context/
│   │   └── AuthContext.tsx       # Auth state (login/logout/refresh)
│   ├── lib/
│   │   └── api.ts                # Axios instance + typed API helpers
│   ├── types/                    # Shared TypeScript types
│   ├── e2e/                      # Playwright smoke tests
│   ├── next.config.ts            # /api/* proxy rewrite
│   └── tailwind.config.ts
│
├── backend/                      # Express 5 REST API
│   ├── src/
│   │   ├── app.ts                # Entry point — middleware stack + bootstrap
│   │   ├── config/
│   │   │   ├── database.ts       # Mongoose connect/disconnect
│   │   │   ├── env.ts            # Zod-validated env schema
│   │   │   └── redis.ts          # ioredis client
│   │   ├── constants/
│   │   │   ├── auth.constants.ts # Cookie names, Redis key prefixes
│   │   │   └── roles.constants.ts# Roles, hierarchy, permission sets
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   └── contact.controller.ts
│   │   ├── middleware/
│   │   │   ├── authenticate.ts   # JWT verify → attach req.user
│   │   │   ├── authorize.ts      # requireRole / requirePermission / requireOwnership
│   │   │   ├── errorHandler.ts   # Centralised error serialiser
│   │   │   ├── notFound.ts       # 404 catcher
│   │   │   ├── rateLimiter.ts    # API / auth / reset limiters
│   │   │   ├── requestLogger.ts  # pino-http request logging
│   │   │   └── validate.ts       # Zod body/query validator middleware
│   │   ├── models/
│   │   │   ├── user.model.ts     # Mongoose User schema
│   │   │   └── Contact.ts        # Mongoose Contact schema
│   │   ├── repositories/
│   │   │   └── user.repository.ts# Data-access layer for User
│   │   ├── routes/
│   │   │   ├── index.ts          # Route aggregator
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── admin.routes.ts
│   │   │   └── contact.routes.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts   # Business logic — auth flows
│   │   │   ├── jwt.service.ts    # Issue / verify / revoke tokens
│   │   │   ├── email.service.ts  # Nodemailer email templates
│   │   │   └── password.service.ts
│   │   ├── types/
│   │   │   ├── auth.types.ts     # DTOs and authenticated user type
│   │   │   └── express.d.ts      # req.user type augmentation
│   │   ├── utils/
│   │   │   ├── ApiError.ts       # Typed HTTP error class
│   │   │   ├── ApiResponse.ts    # Consistent response shape
│   │   │   ├── asyncHandler.ts   # Wraps async route handlers
│   │   │   ├── crypto.ts         # Secure token generation + hashing
│   │   │   └── logger.ts         # Pino logger instance
│   │   └── validators/           # Zod schemas for request bodies
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .env.example
│
├── .github/
│   └── workflows/
│       ├── ci.yml                # Typecheck + test + E2E
│       └── deploy.yml            # Vercel + Render deployment
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+
- **MongoDB** 7 (local install or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Redis** 7 (local install or [Upstash](https://upstash.com))
- **npm** 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/leoclubofpokharapuspanjali.git
cd leoclubofpokharapuspanjali

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Environment Variables

#### Backend — `backend/.env`

Copy the example file and fill in the values:

```bash
cp backend/.env.example backend/.env
```

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | Express server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/leoclub_auth` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_ACCESS_SECRET` | HS256 secret for access tokens (32+ chars) | `openssl rand -base64 64` |
| `JWT_REFRESH_SECRET` | HS256 secret for refresh tokens (32+ chars) | `openssl rand -base64 64` |
| `JWT_ACCESS_EXPIRES_IN` | Access token TTL | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token TTL | `7d` |
| `CSRF_SECRET` | CSRF double-submit secret (32+ chars) | `openssl rand -base64 64` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |
| `SMTP_HOST` | SMTP server hostname | `smtp.ethereal.email` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | — |
| `SMTP_PASS` | SMTP password | — |
| `SMTP_FROM` | Sender address | `"Leo Club <noreply@leoclubpuspanjali.org>"` |
| `BCRYPT_ROUNDS` | bcrypt work factor | `12` |
| `MAX_LOGIN_ATTEMPTS` | Failed logins before lockout | `5` |
| `LOCKOUT_DURATION_MINUTES` | Account lockout duration | `15` |
| `RESET_TOKEN_EXPIRES_MINUTES` | Password reset link TTL | `60` |

#### Frontend — `frontend/.env.local`

```bash
cp frontend/.env.local.example frontend/.env.local
```

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Express API base URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (for OG tags) | `http://localhost:3000` |

### Running Locally

Start MongoDB and Redis first (or use Docker):

```bash
# Start MongoDB + Redis with Docker Compose
cd backend && docker-compose up -d
```

Then start the backend and frontend in separate terminals:

```bash
# Terminal 1 — backend (hot reload via tsx watch)
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API health check | http://localhost:5000/ |

---

## API Reference

All routes are prefixed with `/api`. Responses follow a consistent envelope:

```json
{
  "success": true,
  "message": "Human-readable description",
  "data": { }
}
```

Errors return the appropriate HTTP status code plus:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ]
}
```

### Authentication Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create a new account |
| `POST` | `/api/auth/login` | Public | Login and receive tokens as HTTP-only cookies |
| `POST` | `/api/auth/refresh` | Public | Rotate access + refresh tokens |
| `POST` | `/api/auth/forgot-password` | Public | Send password-reset email |
| `POST` | `/api/auth/reset-password` | Public | Reset password with token from email |
| `POST` | `/api/auth/verify-email` | Public | Verify email address with token |
| `POST` | `/api/auth/logout` | Required | Revoke current refresh token |
| `POST` | `/api/auth/logout-all` | Required | Revoke all refresh tokens (all devices) |
| `POST` | `/api/auth/change-password` | Required | Change password while logged in |
| `GET` | `/api/auth/profile` | Required | Get authenticated user's profile |
| `PUT` | `/api/auth/profile` | Required | Update name / avatar |

**Register request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

**Login request body:**
```json
{
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

**Login response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "64f...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user",
      "isEmailVerified": true,
      "isActive": true,
      "permissions": ["read:profile", "update:profile", "change:password"]
    }
  }
}
```

> Tokens are set as HTTP-only cookies (`access_token`, `refresh_token`) — not returned in the response body.

---

### User Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/users` | admin+ | List all users (paginated) |
| `GET` | `/api/users/:id` | admin+ | Get user by ID |
| `PUT` | `/api/users/:id` | Self or admin+ | Update user profile |
| `DELETE` | `/api/users/:id` | admin+ | Delete a user |

---

### Admin Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/users` | admin+ | List all users |
| `DELETE` | `/api/admin/users/:id` | admin + `delete:users` | Deactivate a user |
| `PUT` | `/api/admin/users/:id/role` | super_admin + `assign:roles` | Assign a role to a user |

**Assign role request body:**
```json
{ "role": "staff" }
```

---

### Contact Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/contacts` | Public | Submit a contact form message |
| `GET` | `/api/contacts` | admin+ | List all contact submissions (paginated) |
| `DELETE` | `/api/contacts/:id` | admin+ | Delete a contact submission |

**Submit contact request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration inquiry",
  "message": "We would love to partner with your club..."
}
```

---

## Authentication & Authorization

Tokens are issued as a pair on login and registration:

- **Access token** — short-lived (15 min), stored in an `HttpOnly; Secure; SameSite=Lax` cookie
- **Refresh token** — longer-lived (7 days), stored in Redis and rotated on every use

**Silent refresh flow:**

1. Frontend Axios interceptor catches a `401` response.
2. Issues a `POST /api/auth/refresh` request (cookies sent automatically).
3. On success, retries the original request once.
4. On failure, clears auth state and redirects to `/admin/login`.

The `authenticate` middleware reads the token from the cookie first, then falls back to the `Authorization: Bearer <token>` header for API clients.

---

## Roles & Permissions

| Role | Level | Permissions |
|---|---|---|
| `user` | 0 | Read profile, update profile, change password |
| `staff` | 1 | + Read users |
| `manager` | 2 | + Update users |
| `admin` | 3 | + Delete users, assign roles |
| `super_admin` | 4 | All permissions + system config + manage admins |

The `requireRole(role)` middleware enforces a **minimum role level** — a `super_admin` passes a check for `admin`. `requirePermission(permission)` checks for a specific granular permission. `requireOwnership` allows a user to modify their own resource while admins can modify any.

---

## Frontend Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Who We Are, Our Work, Team, Leader, Testimonials, FAQ |
| `/about` | About the club |
| `/events` | Upcoming and past events |
| `/gallery` | Photo gallery |
| `/team` | Full team listing |
| `/contact` | Contact form |
| `/verify-email` | Email verification landing page |
| `/admin` | Admin dashboard (protected) |
| `/admin/login` | Admin login page |

---

## CI/CD Pipeline

### Continuous Integration (`.github/workflows/ci.yml`)

Triggers on pushes to `main` / `dev` and all pull requests to `main`.

| Job | Steps |
|---|---|
| **Backend** | Spins up MongoDB 7 + Redis 7, runs `tsc --noEmit`, then `vitest run` |
| **Frontend** | Runs `tsc --noEmit`, then `next build` |
| **E2E** (main only) | Installs Playwright + Chromium, builds Next.js, runs `playwright test` |

Playwright failure artifacts (HTML report) are uploaded and retained for 7 days.

### Continuous Deployment (`.github/workflows/deploy.yml`)

Triggers on pushes to `main` only.

| Job | Target |
|---|---|
| **deploy-frontend** | Vercel production deployment via Vercel CLI |
| **deploy-backend** | Render deployment via webhook URL |

Required GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RENDER_DEPLOY_HOOK_URL`.

---

## Deployment

### Frontend — Vercel

1. Import the repository in the [Vercel dashboard](https://vercel.com/new).
2. Set the **Root Directory** to `frontend`.
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` → your Render backend URL + `/api`
   - `NEXT_PUBLIC_SITE_URL` → your Vercel deployment URL

### Backend — Render

1. Create a new **Web Service** and connect the repository.
2. Set **Root Directory** to `backend`, **Build Command** to `npm run build`, **Start Command** to `npm start`.
3. Add all environment variables from `.env.example` (use production MongoDB Atlas and Upstash Redis URLs).
4. Copy the **Deploy Hook URL** and store it as `RENDER_DEPLOY_HOOK_URL` in GitHub secrets.

### Backend — Docker (self-hosted)

```bash
cd backend
docker-compose up --build
```

The `docker-compose.yml` starts the Express app alongside a MongoDB and Redis container.

---

## Security

| Concern | Implementation |
|---|---|
| Security headers | Helmet |
| CORS | Explicit allowlist; credentials-enabled |
| NoSQL injection | express-mongo-sanitize (strips `$` / `.` from input) |
| HTTP parameter pollution | hpp |
| Password storage | bcryptjs (configurable work factor) |
| Account lockout | 5 failed attempts → 15-minute lockout (configurable) |
| Token storage | HTTP-only cookies — not accessible via JavaScript |
| Refresh token revocation | Redis-backed allowlist; `logout-all` invalidates all devices |
| Rate limiting | General API limiter + stricter auth/reset limiters |
| Input validation | Zod schemas on every mutating endpoint |
| Sensitive fields | `password`, `passwordResetToken`, `emailVerifyToken`, `loginAttempts`, `lockUntil` excluded from all query responses by default |

---

## Contributing

1. Fork the repository and create a feature branch from `dev`.
2. Follow the existing code style (TypeScript strict mode, Zod for validation).
3. Ensure `npm run typecheck` and `npm test` pass before opening a PR.
4. Open a pull request against the `dev` branch — not `main`.

---

*Leo Club of Pokhara Puspanjali — Lead. Serve. Inspire.*
