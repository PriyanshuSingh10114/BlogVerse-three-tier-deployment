import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "bookmark"],
      required: true,
    }
  },
  { timestamps: true }
);

// A user can only like or bookmark a specific blog once
interactionSchema.index({ user: 1, blog: 1, type: 1 }, { unique: true });
// Fast query for all likes/bookmarks on a blog
interactionSchema.index({ blog: 1, type: 1 });
// Fast query for a user's bookmarks/likes
interactionSchema.index({ user: 1, type: 1 });

export default mongoose.model("Interaction", interactionSchema);
