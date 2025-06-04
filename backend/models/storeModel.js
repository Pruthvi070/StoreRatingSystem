const db = require("../config/db");

const Store = {
    getAll: async () => {
        const [stores] = await db.promise().query(`
            SELECT s.id, s.name, s.address, s.owner_id, s.email, u.name AS owner_name,
    COALESCE((
        SELECT AVG(extracted_ratings.rating_value)
        FROM ratings r
        JOIN JSON_TABLE(
            r.ratings, '$[*]'
            COLUMNS (rating_value INT PATH '$.rating')
        ) AS extracted_ratings
        WHERE r.store_id = s.id
    ), 0) AS rating
FROM stores s
JOIN users u ON s.owner_id = u.id  -- Fetch owner's name from users table
ORDER BY s.created_at DESC;
            `);
        for (const store of stores) {
            store.averageRating = await Store.getAverageByStoreId(store.id);
        }
        return stores;
    },
    search:async (query) => {
        const [stores] = await db.promise().query(
            "SELECT * FROM stores WHERE name LIKE ? OR address LIKE ?",
            [`%${query}%`, `%${query}%`]
        );
        return stores;
    },
    getByStoreId: async (storeId) => {
        const [ratings] = await db.promise().query(
            "SELECT ratings FROM ratings WHERE store_id = ?",
            [storeId]
        );
        console.log("ratings11",ratings);
        return ratings.length ? JSON.parse(ratings[0].ratings) : null;
    },
    findByOwnerId: async (ownerId) => {
        const [store] = await db.promise().query("SELECT * FROM stores WHERE owner_id = ?", [ownerId]);
        return store.length ? store[0] : null;
    },
    getAverageByStoreId: async (storeId) => {
        const [rows] = await db.promise().query(
            "SELECT AVG(rating_value) AS avg_rating FROM ratings, JSON_TABLE(ratings, '$[*]' COLUMNS (rating_value INT PATH '$.rating')) AS extracted_ratings WHERE store_id = ?",
            [storeId]
        );
        return rows.length ? parseFloat(rows[0].avg_rating) || 0 : 0;
    },
    findById: async (userId) => {
        try {
            const [rows] = await db.query("SELECT * FROM stores WHERE owner_id = ?", [userId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching store by ID:", error);
            throw error;
        }
    }
    
};


module.exports = Store;

