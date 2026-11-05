import blogRepository from "../repositories/blog.repository.js";
import Interaction from "../models/Interaction.js";
import mongoose from "mongoose";

class BlogService {
  async getAllBlogs(query) {
    return await blogRepository.findAll(query);
  }

  async getBlogBySlug(slug) {
    let blog = null;
    // Check if valid ObjectId for direct lookup
    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await blogRepository.findById(slug);
    }
    if (!blog) {
      blog = await blogRepository.findBySlug(slug);
    }
    if (!blog) {
      const error = new Error("Blog not found");
      error.statusCode = 404;
      throw error;
    }

    // Increment view count in background
    blogRepository.incrementView(blog._id).catch((err) => console.error("Failed to update view count", err));

    return blog;
  }

  async createBlog(data, authorId) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    const blogData = { ...data, author: authorId, slug };
    return await blogRepository.create(blogData);
  }

  async deleteBlog(id, userId, userRole) {
    const blog = await blogRepository.findById(id);
    if (!blog) {
      const error = new Error("Blog not found");
      error.statusCode = 404;
      throw error;
    }

    // BOLA defense: only author or admin can delete
    const isAuthor = blog.author?.toString() === userId.toString();
    const isAdmin = userRole === "admin";
    if (!isAuthor && !isAdmin) {
      const error = new Error("Forbidden: You are not authorized to delete this post");
      error.statusCode = 403;
      throw error;
    }

    return await blogRepository.softDelete(id);
  }

  async toggleInteraction(blogId, userId, type) {
    const existing = await Interaction.findOne({ blog: blogId, user: userId, type });
    let isAdded = false;

    if (existing) {
      await Interaction.findByIdAndDelete(existing._id);
      await blogRepository.update(blogId, { $inc: { [`${type}sCount`]: -1 } });
    } else {
      await Interaction.create({ blog: blogId, user: userId, type });
      await blogRepository.update(blogId, { $inc: { [`${type}sCount`]: 1 } });
      isAdded = true;
    }

    return { success: true, action: isAdded ? "added" : "removed" };
  }
}

export default new BlogService();
