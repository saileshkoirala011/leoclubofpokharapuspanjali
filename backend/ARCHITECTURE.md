# Secure Backend API Design Notes

## REST APIs and API Design Principles
- Use resource-oriented endpoints (`/api/users`, `/api/users/analytics`).
- Keep HTTP methods semantic (`GET` for reads, `POST` for opset/upsert writes).
- Return consistent envelopes:
  - `{ success: boolean, message?: string, data?: object }`
- Use pagination for collection reads.
- Validate inputs and return 4xx for client mistakes.

## Authentication & Authorization
- JWT-based stateless authentication is implemented using signed HS256 tokens.
- Tokens are accepted from either:
  - `Authorization: Bearer <token>` header, or
  - secure HttpOnly cookie `authToken`.
- Role-based authorization middleware (`authorize('admin')`) protects admin endpoints.
- Session-oriented cookie support is included via `cookie-parser`.
- OAuth support can be added at `/api/auth/oauth/*`; env placeholders exist for provider IDs.

## Cookies, Headers, and Caching
- Cookie flags:
  - `httpOnly: true`
  - `sameSite: 'strict'`
  - `secure: true` in production
- Security headers include CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.
- Analytics endpoint returns cache metadata (`X-Cache`) and `Cache-Control`/`ETag`.

## Caching (Redis/CDN)
- Current implementation uses an in-memory cache service with TTL.
- Swap cache service internals to Redis for distributed deployments.
- CDN can cache read-only public assets and anonymous API responses.

## Load Balancing
- `app.set('trust proxy', 1)` enables correct client-IP behavior behind load balancers.
- Keep API stateless (JWT) so multiple backend instances can scale horizontally.

## Asynchronous Processing (Queues/Workers)
- `queueService` provides async job processing for user opset activities.
- Worker runs separately from request flow to reduce API response latency.
- Replace in-memory queue with BullMQ/RabbitMQ/SQS for production-grade reliability.

## Microservices vs Monolith
- Current system is a modular monolith:
  - single deployable app
  - separated domains (auth, users, contacts, gallery, team, about)
- Evolve to microservices if you need:
  - independent team ownership,
  - distinct scaling profiles,
  - strict fault isolation.
- For current scope and team size, modular monolith is generally the best complexity/performance tradeoff.
