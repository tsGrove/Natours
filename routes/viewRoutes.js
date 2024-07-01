const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authContoller = require("./../controllers/authController");

const router = express.Router();

router.get("/", authContoller.isLoggedIn, viewsController.getOverview);
router.get("/tour/:slug", authContoller.isLoggedIn, viewsController.getTour);
router.get("/login", authContoller.isLoggedIn, viewsController.getLoginForm);
router.get("/me", authContoller.protect, viewsController.getAccount);

router.post(
  "/submit-user-data",
  authContoller.protect,
  viewsController.updateUserData
);

module.exports = router;
