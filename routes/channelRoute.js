const router = require("express").Router();

const JWT = require("../helpers/jwt");
const {
  getUserChannel,
  addChannel,
  singleChannel,
  editChannel,
  subChannel,
} = require("../controllers/channelController");

router.get("/channel/user", JWT, getUserChannel);

router.get("/channel/single/:channelId", JWT, singleChannel);

router.post("/channel/add", JWT, addChannel);

router.put("/channel/edit/:channelId", editChannel);

router.get("/channel/subscription/:channelId", JWT, subChannel);

module.exports = router;
