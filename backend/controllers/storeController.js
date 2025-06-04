const db = require("../config/db");
const Store = require("../models/storeModel");
const Rating = require("../models/ratingModel");
// const { v4: uuidv4 } = require("uuid");

const generateCustomId = (prefix) => `${prefix}${Math.floor(100 + Math.random() * 900)}`;

/**
 * @desc Create a Store (Assign to Store Owner)
 * @route POST /admin/stores
 */
exports.createStore = async (req, res) => {
    try {
        const { store_name, email, address, owner_id } = req.body;

        if (!store_name || !email || !address || !owner_id) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if owner exists and is a store_owner
        const [owner] = await db.promise().query("SELECT id FROM users WHERE id = ? AND role = 'store_owner'", [owner_id]);
        if (owner.length === 0) {
            return res.status(400).json({ message: "Invalid store owner ID." });
        }

        const storeId = generateCustomId("stid");

        await db.promise().query(
            "INSERT INTO stores (id, name, email, address, owner_id) VALUES (?, ?, ?, ?, ?)",
            [storeId, store_name, email, address, owner_id]
        );

        res.status(201).json({
            message: "Store created successfully.",
            store: { id: storeId, name: store_name, owner_id }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * @desc View all stores
 * @route GET /stores
 */
exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.getAll();
        res.status(200).json(stores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * @desc Search stores (by name or address)
 * @route GET /stores/search
 */
exports.searchStores = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Query parameter is required." });
        }

        const stores = await Store.search(query);
        res.status(200).json(stores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};




/**
 * @desc View all ratings for their store
 * @route GET /store-owner/ratings
 */
exports.getStoreRatings = async (req, res) => {
    try {
        const store = await Store.findByOwnerId(req.user.id);
        if (!store) {
            return res.status(404).json({ message: "Store not found for this owner." });
        }

        const ratings = await Rating.getByStoreId(store.id);
        res.status(200).json({ store: store.name, ratings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * @desc View average rating for their store
 * @route GET /store-owner/average-rating
 */
exports.getAverageRating = async (req, res) => {
    try {
        console.log("reqqqq",req)
        const store = await Store.findByOwnerId(req.user.id);
        console.log(store);
        if (!store) {
            return res.status(404).json({ message: "Store not found for this owner." });
        }


        const averageRating = await Store.getAverageByStoreId(store.id);
        console.log("averageRating",averageRating);
        res.status(200).json({ store: store.name, averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};


exports.getStoreDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("userId",userId);
        const store = await Store.findByOwnerId(userId);
        console.log(store);
        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        res.status(200).json(store);
    } catch (error) {
        console.error("Error fetching store details:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
