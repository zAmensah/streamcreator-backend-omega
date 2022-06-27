const router = require("express").Router();

const {
  getNetwork,
  removeFirstChar,
  paymentRef,
} = require("../controllers/testController");

router.get("/test", getNetwork);

router.get("/test/2", removeFirstChar);

router.get("/test/3", paymentRef);

module.exports = router;
