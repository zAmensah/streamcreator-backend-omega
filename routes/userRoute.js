const router = require("express").Router();

const JWT = require("../helpers/jwt");

const { getProfile, userChannels } = require("../controllers/userController");

router.get("/profile", JWT, getProfile);

router.get("/user/subscription", JWT, userChannels);

module.exports = router;
