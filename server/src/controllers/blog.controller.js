import blogService from "../services/blog.service.js";

export const getAllBlogs = async (req, res, next) => {
  try {
    const { page, limit, search, status } = req.query;
    const result = await blogService.getAllBlogs({ page, limit, search, status });
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogBySlug(req.params.slug);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const blog = await blogService.createBlog(req.body, req.user._id);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: "Blog soft deleted" });
  } catch (error) {
    next(error);
  }
};

export const toggleInteraction = async (req, res, next) => {
  try {
    const { type } = req.body; // 'like' or 'bookmark'
    if (!['like', 'bookmark'].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid interaction type" });
    }
    const result = await blogService.toggleInteraction(req.params.id, req.user._id, type);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
