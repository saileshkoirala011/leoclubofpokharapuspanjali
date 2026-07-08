import app from "./app.js";
import connectDB from "./config/database.js";
import { PORT } from "./config/env.js";

connectDB();

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const shutdown = (signal) => {
  console.log(`Received ${signal}, shutting down gracefully`);
  server.close(() => process.exit(0));
};

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION");
  console.error(err);
  server.close(() => process.exit(1));
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
