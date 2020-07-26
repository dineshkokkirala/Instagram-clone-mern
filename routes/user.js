const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrytpjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("jwtsecret");

// router.get("/", (req, res) => {
//   res.send("User route");
// });

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

    // const payload={
    //     user:{
    //         id:user.id
    //     }
    // }

    jwt.sign({ _id: user._id }, secret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
