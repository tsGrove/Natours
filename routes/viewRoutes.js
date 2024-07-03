const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authContoller = require("./../controllers/authController");
const bookingController = require("./../controllers/bookingController");

const router = express.Router();

router.get(
  "/",
  bookingController.createBookingCheckout,
  authContoller.isLoggedIn,
  viewsController.getOverview
);

router.get("/tour/:slug", authContoller.isLoggedIn, viewsController.getTour);
router.get("/login", authContoller.isLoggedIn, viewsController.getLoginForm);
router.get("/me", authContoller.protect, viewsController.getAccount);
router.get("/my-tours", authContoller.protect, viewsController.getMyTours);

router.post(
  "/submit-user-data",
  authContoller.protect,
  viewsController.updateUserData
);

module.exports = router;
