const express = require("express");
const { createUser, createStore, getAdminDashboard, getUsers, getUserDetails, getStores ,getAllRatings} = require("../controllers/adminController");
const { protect, adminOnly ,authorizeStoreOwner} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin routes
router.post("/users", protect, adminOnly, createUser);
router.post("/stores", protect, adminOnly, createStore);
router.get("/dashboard", protect, adminOnly, getAdminDashboard);
router.get("/users", protect, adminOnly, getUsers);
router.get("/users/:id", protect, getUserDetails);
router.get("/stores", protect, adminOnly, getStores);
router.get("/allratings", protect, adminOnly, getAllRatings);
module.exports = router;
