const Channel = require("../models/channel");

exports.getUserChannel = async (req, res) => {
  const userChannel = await Channel.find({ user: req.user })
    .select("name videos cover")
    .populate("videos");

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
