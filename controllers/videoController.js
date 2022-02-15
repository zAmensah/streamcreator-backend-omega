const Video = require("../models/video");
const Channel = require("../models/channel");
const User = require("../models/user");

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
    const videos = await Video.find().populate("channel").sort("-createdAt");

    res.json({ success: true, videos });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

exports.singleVideo = async (req, res) => {
  var channelSub;
  const { videoId } = req.params;
  try {
    const watchVideo = await Video.findById(videoId).populate("channel");
    const user = await User.findOne(req.user);

    if (user) {
      channelSub = user.subscriptions.some((channel) => {
        console.log(channelSub);
        return channel.equals(watchVideo.channel._id);
      });
    }

    res.json({ success: true, watchVideo, channelSub });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

exports.videoView = async (req, res, next) => {
  const { videoId } = req.params;

  const video = await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

  if (!video)
    return res.status(400).json({ success: false, message: "view not added" });

  next();
};
