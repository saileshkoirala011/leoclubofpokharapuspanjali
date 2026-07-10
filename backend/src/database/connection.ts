/**
 * Re-exports connectDB / disconnectDB for backward compat.
 * Use config/database.ts directly in new code.
 */
export { connectDB, disconnectDB } from "../config/database.js";
