const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const auth = async (req, res, next) => {
  let token = req.header("auth-token");

  if (!token)
    return res.status(401).json({ error: "No token! Authorization Denied" });

  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    req.user = await User.findById(decoded._id).select("-password");
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error at Auth");
  }
};

module.exports = auth;
