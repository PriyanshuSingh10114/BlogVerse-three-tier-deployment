import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import newsletterRoutes from "./utils/newsletter.js";
import rssRoutes from "./routes/rss.routes.js";
import morganMiddleware from "./middlewares/morgan.middleware.js";

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Parsers
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

// Logging
app.use(morganMiddleware);

// Health check endpoints for Kubernetes and CloudWatch / ALB
const healthHandler = (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const isHealthy = dbState === 1 || dbState === 2; // connected or connecting
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "healthy" : "degraded",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbState === 1 ? "connected" : dbState === 2 ? "connecting" : "disconnected",
  });
};

app.get("/health", healthHandler);
app.get("/api/health", healthHandler);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/rss", rssRoutes);
app.use("/api/blogs", blogRoutes);

// Legacy posts endpoint for client compatibility
app.get("/api/posts", async (_req, res, next) => {
  try {
    const posts = await mongoose.connection.collection("posts").find({}).toArray();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// Root welcome message
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "BlogVerse API is running securely",
    version: "2.0.0",
    docs: "/api/health",
  });
});

// Error Handler Middleware
app.use(errorHandler);

export default app;
