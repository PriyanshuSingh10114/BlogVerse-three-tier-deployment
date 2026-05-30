import express from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  deleteBlog,
  toggleInteraction
} from "../controllers/blog.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// Protected routes
router.use(protect);
router.post("/", createBlog);
router.delete("/:id", authorize('admin', 'user'), deleteBlog);

// Interactions (Like, Bookmark)
router.post("/:id/interaction", toggleInteraction);

export default router;
