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

exports.subChannel = async (req, res) => {
  const { channelId } = req.params;

  const channelSub = await User.findByIdAndUpdate(req.user);

  channelSub.subscriptions.push(channelId);
  channelSub.save();

  res.json({ success: true, message: "Successfully Subscribed" });
};
