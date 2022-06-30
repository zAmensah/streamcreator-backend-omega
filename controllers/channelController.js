const Channel = require("../models/channel");
const User = require("../models/user");

exports.getUserChannel = async (req, res) => {
  const userChannel = await Channel.find({ user: req.user })
    .populate("videos")
    .select("name logo about totalLikes");

  return res.json({ success: true, userChannel });
};

exports.addChannel = async (req, res) => {
  try {
    let channel = new Channel(req.body);
    channel.user = req.user;

    const channelCheck = await Channel.find({ name: req.body.name });

    if (channelCheck)
      return res.status(401).json({
        success: false,
        message: "Channel name already taken. Please try something else",
      });

    await channel.save();
    res.json({ success: true, message: "Channel added successfully", channel });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error adding channel" });
  }
};

exports.singleChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId).populate("videos");

    res.json({ success: true, channel });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error adding channel" });
  }
};

exports.userChannel = async (req, res) => {};

exports.editChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);

    channel.about = req.body.about;

    channel.save();
    res.json({ success: true, message: "Edit done" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error Editing Channel Details" });
  }
};

exports.channelSubscription = async (req, res) => {
  const { amount, userId, channelId } = req.body;

  try {
    const user = await User.findById(req.user);
    const channel = await Channel.findById(channelId);
    const owner = await User.findById(userId);

    if (user.balance < amount) {
      return res.status(400).json({
        success: false,
        message:
          "Insufficient balance. Please topup account to subscribe to channel.",
      });
    }

    user.balance = user.balance - amount;
    owner.balance = owner.balance + amount;

    await channel.subscribers.push(req.user);
    await user.subscriptions.push(channelId);

    await user.save();
    await channel.save();
    await owner.save();

    return res.json({
      success: true,
      message: "Subscribe to channel successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error subscribing to channel");
  }
};

// exports.subChannel = async (req, res) => {
//   const { channelId } = req.params;

//   const channelSub = await User.findByIdAndUpdate(req.user);

//   channelSub.subscriptions.push(channelId);
//   channelSub.save();

//   res.json({ success: true, message: "Successfully Subscribed" });
// };

exports.chanelVideos = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId).populate("videos");

    return res.json({ success: true, channel });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Error getting user channel" });
  }
};

exports.channelSub = async (req, res) => {
  try {
    const channel = await User.find({ _id: req.user }).populate(
      "subscriptions6"
    );
    // .select("subscriptions")
    // .populate("subscriptions");

    console.log(channel);
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Error etting user subscription" });
  }
};
