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
router.get("/allposts", async (req, res) => {
  try {
    let posts = await Post.find().populate("postedBy", "_id name");
    res.json({ posts });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

//get own posts
router.get("/myposts", auth, async (req, res) => {
  try {
    let posts = await Post.find().populate("postedBy", "_id name");
    res.json({ myposts: posts });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
