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
    default: "no_photo",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
