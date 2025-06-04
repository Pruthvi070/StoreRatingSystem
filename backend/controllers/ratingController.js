const Rating = require("../models/ratingModel");
const Store = require("../models/storeModel");
/**
 * @desc Submit a rating for a store
 * @route POST /ratings
 */
exports.submitRating = async (req, res) => {
    try {
        const { userId, storeId, rating } = req.body;

        if (!userId || !storeId || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Invalid input." });
        }

        console.log("req.body",req.body);
        await Rating.addRating(userId, storeId, rating);
        const avg_rating=await Store.getAverageByStoreId(storeId);
        res.status(201).json({ message: "Rating submitted successfully.",avg_rating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};


/**
 * @desc Get ratings of a store
 * @route GET /ratings/:storeId
 */
exports.getStoreRatings = async (req, res) => {
    try {
        const { storeId } = req.params;
        const ratings = await Rating.getByStoreId(storeId);

        if (!ratings) {
            return res.status(404).json({ message: "No ratings found for this store." });
        }

        res.status(200).json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// exports.getUserRatingForStore = async (req, res) => {
//     try {
//         const { userId, storeId } = req.params;
//         // console.log("Fetching rating for User:", userId, "Store:", storeId);

//         if (!userId || !storeId) {
//             return res.status(400).json({ message: "User ID and Store ID are required." });
//         }

//         // Fetch ratings array for the store
//         const storeRatings = await Rating.getByStoreId(storeId);

//         if (!storeRatings || storeRatings.length === 0) {
//             return res.status(200).json({ message: "No ratings yet. You can rate this store.", userRating: null });
//         }

//         // Extract the ratings JSON safely
//         const userRating = storeRatings.find(rating => rating.userId === userId);
//         console.log("ratingsData",storeRatings);
//         if (!ratingsData) {
//             return res.status(200).json({ message: "No ratings found for this store.", userRating: null });
//         }

//         // Parse the ratings array from the database
//         let ratingsArray;
//         try {
//             ratingsArray = JSON.parse(ratingsData);
//         } catch (error) {
//             console.error("JSON parsing error:", error);
//             return res.status(500).json({ message: "Error parsing ratings data." });
//         }

//         // Find the logged-in user's rating
//         const userRating = ratingsArray.find(rating => rating.userId === userId);
//         console.log("User's rating:", userRating);

//         if (userRating) {
//             return res.status(200).json({ message: "You have already rated this store.", userRating });
//         } else {
//             return res.status(200).json({ message: "You haven't rated this store yet. You can rate it now.", userRating: null });
//         }
//     } catch (error) {
//         console.error("Error fetching user rating:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// };
exports.getUserRatingForStore = async (req, res) => {
    try {
        const { userId, storeId } = req.params;

        if (!userId || !storeId) {
            return res.status(400).json({ message: "User ID and Store ID are required." });
        }

        // Fetch ratings array for the store
        const storeRatings = await Rating.getByStoreId(storeId);

        if (!storeRatings || storeRatings.length === 0) {
            return res.status(200).json({ message: "No ratings yet. You can rate this store.", userRating: null });
        }

        console.log("storeRatings1", storeRatings);

        // Find the logged-in user's rating
        const userRating = storeRatings.find(rating => rating.userId === userId);

        if (userRating) {
            return res.status(200).json({ message: "You have already rated this store.", userRating });
        } else {
            return res.status(200).json({ message: "You haven't rated this store yet. You can rate it now.", userRating: null });
        }
    } catch (error) {
        console.error("Error fetching user rating:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// exports.getUserRatingForStore = async (req, res) => {
//     try {
//         const { userId, storeId } = req.params;
//         console.log("123",userId,storeId);
//         if (!userId || !storeId) {
//             return res.status(400).json({ message: "User ID and Store ID are required." });
//         }

//         // Fetch ratings array for the store
//         const storeRatings = await Rating.getByStoreId(storeId);

//         if (!storeRatings || storeRatings.length === 0) {
//             return res.status(200).json({ message: "No ratings yet. You can rate this store.", userRating: null });
//         }

//         // Parse the ratings array from the database
//         const ratingsArray = JSON.parse(storeRatings[0].ratings);

//         // Find the logged-in user's rating
//         const userRating = ratingsArray.find(rating => rating.userId === userId);
//         console.log("userRating",userRating);
//         if (userRating) {
//             return res.status(200).json({ message: "You have already rated this store.", userRating });
//         } else {
//             return res.status(200).json({ message: "You haven't rated this store yet. You can rate it now.", userRating: null });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// };
