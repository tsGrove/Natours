const bookingController = require("./../controllers/bookingController");
const authController = require("./../controllers/authController");
const express = require("express");

const router = express.Router();

router.get(
  "/checkout-session/:tourID",
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
