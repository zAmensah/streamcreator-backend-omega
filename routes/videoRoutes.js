const router = require("express").Router();

const JWT = require("../helpers/jwt");
const {
  addVideo,
  allVideos,
  addChannel,
  singleVideo,
} = require("../controllers/videoController");

router.post("/video/add", JWT, addVideo);

router.get("/videos/all", allVideos);

router.get("/videos/single/:videoId", singleVideo);

/// Channel Section
router.post("/channel/add", JWT, addChannel);

module.exports = router;
