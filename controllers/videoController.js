const Video = require("../models/video.js");
const Channel = require("../models/channel");

exports.addVideo = async (req, res) => {
  try {
    let video = new Video(req.body);
    video.user = req.user;

    const channel = await Channel.findById(req.body.channel);

    await channel.videos.push(video._id);

    await channel.save();
    await video.save();

    res.json({ success: true, message: "Video Added Successfully", channel });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error while adding video" });
  }
};

exports.allVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("channel");

    res.json({ success: true, videos });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

exports.singleVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const watchVideo = await Video.findById(videoId).populate("channel");
    res.json({ success: true, watchVideo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

// ===========================

// CHANNELS SECTION
// ===========================

exports.addChannel = async (req, res) => {
  try {
    let channel = new Channel(req.body);
    channel.user = req.user;

    await channel.save();
    res.json({ success: true, message: "Channel created Successfully" });
  } catch (error) {
    return rres.status(500).json({ success: false, message: error });
  }
};
