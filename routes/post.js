const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/createpost", auth, async (req, res) => {
  const { title, body, url } = req.body;
  //console.log({ title, body, url });

  if (!title || !body || !url)
    return res.status(422).json({ error: "All fields are required" });
  //   console.log(req.user);

  try {
    const post = new Post({
      title,
      body,
      photo: url,
      postedBy: req.user,
    });
    await post.save();
    res.json({ post, message: "Uploaded Successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

// router.post("/createpost", auth, (req, res) => {
//   const { title, body, url } = req.body;
//   console.log({ title, body, url });
//   if (!title || !body || !url)
//     return res.status(422).json({ error: "All fields are required" });
//   const post = new Post({
//     title,
//     body,
//     photo: url,
//     postedBy: req.user,
//   });
//   post
//     .save()
//     .then((result) => {
//       res.json({ post: result });
//     })
//     .catch((err) => console.log(err.message));
// });

//get all posts
router.get("/allposts", auth, async (req, res) => {
  try {
    let posts = await Post.find()
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");
    res.json({ posts });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

//get own posts
router.get("/myposts", auth, async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id name"
    );
    res.json({ myposts: posts });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/like", auth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});
router.put("/unlike", auth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", auth, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/delete/:postId", auth, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json({ result, message: "Deleted Successfully" });
          })
          .catch((err) => console.log(err));
      }
    });
});

module.exports = router;
