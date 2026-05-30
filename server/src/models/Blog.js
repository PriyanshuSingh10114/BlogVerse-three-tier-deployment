import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    excerpt: {
      type: String,
      required: true
    },
    content: {
      type: String, // Can store HTML or Markdown
      required: true
    },
    image: {
      type: String,
      required: true
    },
    tags: [{
      type: String,
      index: true
    }],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    likesCount: {
      type: Number,
      default: 0
    },
    bookmarksCount: {
      type: Number,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Compound index for querying published blogs by author efficiently
blogSchema.index({ author: 1, status: 1, createdAt: -1 });

// Text index for search functionality
blogSchema.index({ title: "text", excerpt: "text", tags: "text" });

// Exclude soft-deleted documents by default
blogSchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export default mongoose.model("Blog", blogSchema);
