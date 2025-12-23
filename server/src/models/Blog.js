import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
