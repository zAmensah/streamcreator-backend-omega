const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.expiredAt < new Date()) {
        return res
          .status(500)
          .json({ success: false, message: "Token expired. Please login" });
      }
      return res
        .status(400)
        .json({ success: false, message: "Cannot authenticate token" });
    }
    req.user = decoded;
    next();
  });
};
