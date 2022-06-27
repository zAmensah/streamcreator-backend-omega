const router = require("express").Router();

const JWT = require("../helpers/jwt");
const {
  getUserChannel,
  addChannel,
  singleChannel,
  editChannel,
  subChannel,
  chanelVideos,
  channelSubscription,
} = require("../controllers/channelController");

router.get("/channel/user", JWT, getUserChannel);

router.get("/channel/single/:channelId", JWT, singleChannel);

router.post("/channel/add", JWT, addChannel);

router.put("/channel/edit/:channelId", editChannel);

// router.get("/channel/subscription/:channelId", JWT, subChannel);

router.get("/channel/videos/:channelId", chanelVideos);

router.post("/channel/subscription", JWT, channelSubscription);

// router.get("/channel/subcriptions", JWT, channelSub);

module.exports = router;
