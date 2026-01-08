import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing");
  process.exit(1);
}

app.get("/ok", (req, res) => {
  res.status(200).send("OK");
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await mongoose.connection
      .collection("posts")
      .find({})
      .toArray();

    res.status(200).json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
}

startServer();

/* 🔒 CRITICAL: prevent silent exits */
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, keeping process alive");
});

process.on("SIGINT", () => {
  console.log("SIGINT received, keeping process alive");
});

