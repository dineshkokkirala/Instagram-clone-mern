const jwt = require("jsonwebtoken");
const config = require("config");

const auth = async (req, res, next) => {
  let token = req.header("auth-token");

  if (!token)
    return res.status(401).json({ error: "No token! Authorization Denied" });

  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    req.user = decoded._id;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error at Auth");
  }
};

module.exports = auth;
