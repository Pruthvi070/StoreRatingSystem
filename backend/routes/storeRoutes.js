const express = require("express");
const { createStore ,getAverageRating,getStoreDetails} = require("../controllers/storeController");
const { protect, adminOnly ,authorizeStoreOwner} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/admin/stores", createStore);
// View all ratings for their store
// router.get("/ratings", protect, authorizeStoreOwner,     );

// View average rating for their store
router.get("/average-rating", protect, authorizeStoreOwner, getAverageRating);
router.get("/:userId", protect, authorizeStoreOwner, getStoreDetails);
module.exports = router;
    