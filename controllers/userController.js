const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

exports.userChannels = async (req, res) => {
  try {
    const userSubscription = await User.findById(req.user)
      .select("subscriptions")
      .populate("subscriptions");

    console.log(userSubscription);

    res.json({ success: true, userSubscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
