import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import sanitize from "./middleware/sanitize.js";
import { FRONTEND_URL } from "./config/env.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many login attempts, please try again later.",
});

app.use(generalLimiter);
app.use("/api/auth", authLimiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(sanitize);
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Leo Club API is running",
  });
});

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

export default app;
