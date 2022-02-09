const router = require("express").Router();

const JWT = require("../helpers/jwt");
const {
  getUserChannel,
  addChannel,
  singleChannel,
} = require("../controllers/channelController");

router.get("/channel/user", JWT, getUserChannel);

router.get("/channel/single/:channelId", singleChannel);

router.post("/channel/add", JWT, addChannel);

module.exports = router;
