const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
