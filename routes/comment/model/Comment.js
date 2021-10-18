const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
