import swaggerJsdoc from "swagger-jsdoc";
import { env }       from "./env.js";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title:       "Leo Club of Pokhara Puspanjali — API",
      version:     "1.0.0",
      description: "REST API for the Leo Club website. Handles authentication, user management, and contact form submissions.",
      contact: {
        name:  "Leo Club Puspanjali",
        email: "leoclubpokharapuspanjali@gmail.com",
      },
    },
    servers: [
      {
        url:         `http://localhost:${env.PORT}/api`,
        description: "Local development",
      },
      {
        url:         "https://leoclubofpokharapuspanjali-api.onrender.com/api",
        description: "Production (Render)",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in:   "cookie",
          name: "access_token",
          description: "HTTP-only access token cookie set automatically on login.",
        },
        bearerAuth: {
          type:         "http",
          scheme:       "bearer",
          bearerFormat: "JWT",
          description:  "Fallback for API clients that cannot use cookies.",
        },
      },
      schemas: {
        // ── Shared ────────────────────────────────────────────────────────────
        ApiSuccess: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string",  example: "Success" },
            data:    { description: "Payload — varies per endpoint" },
          },
        },
        ApiError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string",  example: "Validation failed" },
            details: {
              type:  "array",
              items: {
                type: "object",
                properties: {
                  field:   { type: "string", example: "email" },
                  message: { type: "string", example: "Enter a valid email address" },
                },
              },
              nullable: true,
            },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            total: { type: "integer", example: 42 },
            page:  { type: "integer", example: 1  },
            limit: { type: "integer", example: 15 },
            pages: { type: "integer", example: 3  },
          },
        },
        // ── Auth ──────────────────────────────────────────────────────────────
        AuthUser: {
          type: "object",
          properties: {
            _id:             { type: "string",  example: "64b1c2d3e4f5a6b7c8d9e0f1" },
            name:            { type: "string",  example: "Sailesh Koirala" },
            email:           { type: "string",  example: "sailesh@example.com" },
            role:            { type: "string",  enum: ["user","staff","manager","admin","super_admin"] },
            isEmailVerified: { type: "boolean", example: true  },
            isActive:        { type: "boolean", example: true  },
            permissions:     { type: "array", items: { type: "string" }, example: ["read:users"] },
          },
        },
        RegisterInput: {
          type: "object",
          required: ["name","email","password"],
          properties: {
            name:     { type: "string", example: "Sailesh Koirala" },
            email:    { type: "string", example: "sailesh@example.com" },
            password: { type: "string", minLength: 8, example: "SecurePass123!" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email","password"],
          properties: {
            email:    { type: "string", example: "sailesh@example.com" },
            password: { type: "string", example: "SecurePass123!" },
          },
        },
        // ── Contact ───────────────────────────────────────────────────────────
        Contact: {
          type: "object",
          properties: {
            _id:       { type: "string",  example: "64b1c2d3e4f5a6b7c8d9e0f1" },
            name:      { type: "string",  example: "Ram Sharma" },
            email:     { type: "string",  example: "ram@example.com" },
            subject:   { type: "string",  example: "Membership inquiry" },
            message:   { type: "string",  example: "I would like to join the club." },
            ip:        { type: "string",  example: "203.0.113.42", nullable: true },
            createdAt: { type: "string",  format: "date-time" },
            updatedAt: { type: "string",  format: "date-time" },
          },
        },
        ContactInput: {
          type: "object",
          required: ["name","email","subject","message"],
          properties: {
            name:    { type: "string", minLength: 2,  maxLength: 100,  example: "Ram Sharma" },
            email:   { type: "string", example: "ram@example.com" },
            subject: { type: "string", minLength: 3,  maxLength: 200,  example: "Membership inquiry" },
            message: { type: "string", minLength: 5,  maxLength: 5000, example: "I would like to join." },
          },
        },
        // ── User ──────────────────────────────────────────────────────────────
        User: {
          type: "object",
          properties: {
            _id:             { type: "string",  example: "64b1c2d3e4f5a6b7c8d9e0f1" },
            name:            { type: "string",  example: "Sailesh Koirala" },
            email:           { type: "string",  example: "sailesh@example.com" },
            role:            { type: "string",  enum: ["user","staff","manager","admin","super_admin"] },
            isEmailVerified: { type: "boolean", example: true  },
            isActive:        { type: "boolean", example: true  },
            avatar:          { type: "string",  nullable: true },
            lastLoginAt:     { type: "string",  format: "date-time", nullable: true },
            createdAt:       { type: "string",  format: "date-time" },
            updatedAt:       { type: "string",  format: "date-time" },
          },
        },
      },
    },
    tags: [
      { name: "Auth",     description: "Authentication — register, login, token refresh, password management" },
      { name: "Contacts", description: "Contact form submissions" },
      { name: "Users",    description: "User management (admin only)" },
      { name: "Admin",    description: "Admin-specific operations" },
      { name: "System",   description: "Health check and CSRF token" },
    ],
  },
  // Scan all route files for JSDoc @swagger annotations
  apis: ["./src/routes/*.ts", "./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
