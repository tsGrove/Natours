const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authContoller = require("./../controllers/authController");

const router = express.Router();

router.use(authContoller.isLoggedIn);

router.get("/", viewsController.getOverview);
router.get("/tour/:slug", viewsController.getTour);
router.get("/login", viewsController.getLoginForm);

module.exports = router;
