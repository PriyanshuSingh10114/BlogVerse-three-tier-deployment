import Blog from "../models/Blog.js";
import Interaction from "../models/Interaction.js";
import mongoose from "mongoose";

class BlogRepository {
  async findAll({ page = 1, limit = 10, search = "", status = "published" }) {
    const skip = (page - 1) * limit;
    
    const query = { status };
    if (search) {
      query.$text = { $search: search };
    }

    const [data, total] = await Promise.all([
      Blog.find(query)
        .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("author", "name email"),
      Blog.countDocuments(query)
    ]);

    return { data, total, page: Number(page), totalPages: Math.ceil(total / limit) };
  }

  async findBySlug(slug) {
    // Aggregation pipeline example to fetch blog with advanced populated stats
    const blog = await Blog.aggregate([
      { $match: { slug, status: "published", isDeleted: false } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails"
        }
      },
      { $unwind: "$authorDetails" },
      {
        $project: {
          "authorDetails.password": 0,
          "authorDetails.refreshToken": 0,
          "isDeleted": 0,
          "deletedAt": 0
        }
      }
    ]);
    
    return blog[0] || null;
  }

  async create(data) {
    return await Blog.create(data);
  }

  async update(id, data) {
    return await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async softDelete(id) {
    return await Blog.findByIdAndUpdate(id, { 
      isDeleted: true, 
      deletedAt: new Date() 
    }, { new: true });
  }

  async incrementView(id) {
    return await Blog.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });
  }
}

export default new BlogRepository();
