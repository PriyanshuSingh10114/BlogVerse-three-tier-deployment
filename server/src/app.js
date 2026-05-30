import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import cookieParser from "cookie-parser";

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
app.use(xssClean());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://blogverse-j1q2.onrender.com",
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Logging
app.use(morganMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/rss", rssRoutes);
app.use("/api/blogs", blogRoutes);

// Move the /api/posts route here from server.js to act as a placeholder for blogs before refactor
import mongoose from "mongoose";
app.get("/api/posts", async (req, res, next) => {
  try {
    const posts = await mongoose.connection.collection("posts").find({}).toArray();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("BlogVerse API is running securely");
});

// Error Handler
app.use(errorHandler);

export default app;
