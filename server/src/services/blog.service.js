import blogRepository from "../repositories/blog.repository.js";
import Interaction from "../models/Interaction.js";

class BlogService {
  async getAllBlogs(query) {
    return await blogRepository.findAll(query);
  }

  async getBlogBySlug(slug) {
    const blog = await blogRepository.findBySlug(slug);
    if (!blog) {
      const error = new Error("Blog not found");
      error.statusCode = 404;
      throw error;
    }
    
    // Async background increment view count
    blogRepository.incrementView(blog._id).catch(err => console.error("Failed to update view count", err));
    
    return blog;
  }

  async createBlog(data, authorId) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const blogData = { ...data, author: authorId, slug };
    return await blogRepository.create(blogData);
  }

  async deleteBlog(id, userId) {
    // In a real app we'd verify the user is the author or admin
    const deletedBlog = await blogRepository.softDelete(id);
    if (!deletedBlog) {
      const error = new Error("Blog not found");
      error.statusCode = 404;
      throw error;
    }
    return deletedBlog;
  }

  async toggleInteraction(blogId, userId, type) {
    // type is 'like' or 'bookmark'
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

    return { success: true, action: isAdded ? 'added' : 'removed' };
  }
}

export default new BlogService();
