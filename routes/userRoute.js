const router = require("express").Router();

const JWT = require("../helpers/jwt");

const { getProfile } = require("../controllers/userController");

router.get("/profile", JWT, getProfile);

module.exports = router;
