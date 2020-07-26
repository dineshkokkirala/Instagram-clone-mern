const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrytpjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const secret = config.get("jwtsecret");

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

    jwt.sign({ _id: user._id }, secret, { expiresIn: 3600 }, (err, token) => {
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
    jwt.sign({ _id: user._id }, secret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
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
