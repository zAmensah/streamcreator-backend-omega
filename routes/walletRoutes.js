const router = require("express").Router();

const JWT = require("../helpers/jwt");

const { addMomo } = require("../controllers/walletController");

// router.post("/payment", JWT, addMomo);

module.exports = router;
