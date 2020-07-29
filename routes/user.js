const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrytpjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const secret = config.get("jwtsecret");
const Post = require("../models/Post");

// router.get("/", (req, res) => {
//   res.send("User route");
// });

//Register a User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(422).json({ error: "User already exists" });
    user = new User({
      name,
      email,
      password,
    });

    let salt = await bcrytpjs.genSalt(10);
    user.password = await bcrytpjs.hash(password, salt);
    await user.save();
    // res.json({ message: "Saved Successfully" });

    // const payload={
    //     user:{
    //         id:user.id
    //     }
    // }

    jwt.sign({ _id: user._id }, secret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, message: "Saved Successfully" });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields ares required" });

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid Credentials" });
    let isMatch = await bcrytpjs.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid Credentials" });
    // const { _id, name, email } = user;
    jwt.sign({ _id: user._id }, secret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", auth, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

//get loggedIn user
router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user).select("-password");
    res.json(user);
    // console.log(req.user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
