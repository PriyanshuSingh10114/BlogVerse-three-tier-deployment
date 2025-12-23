import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);

export default router;
