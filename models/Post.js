const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
