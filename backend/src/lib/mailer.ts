/**
 * Re-exports emailService for backward compat.
 * Use emailService directly from services/email.service.ts in new code.
 */
export { emailService as mailer } from "../services/email.service.js";
