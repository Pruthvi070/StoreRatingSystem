const express = require("express");
const { signup, login, logout } = require("../controllers/userController");
const storeController = require("../controllers/storeController");
const ratingController = require("../controllers/ratingController");
const router = express.Router();
//
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/stores", storeController.getAllStores);
router.get("/stores/search", storeController.searchStores);
router.post("/ratings", ratingController.submitRating);
router.get("/ratings/:storeId", ratingController.getStoreRatings);
router.get("/ratings/user/:userId/:storeId", ratingController.getUserRatingForStore);

module.exports = router;
