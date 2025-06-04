const db = require("../config/db");

const Rating = {
    // addRating: async (userId, storeId, rating) => {
    //     await db.promise().query(
    //         "INSERT INTO ratings (store_id, ratings) VALUES (?, ?) ON DUPLICATE KEY UPDATE ratings = JSON_ARRAY_APPEND(ratings, '$', JSON_OBJECT('userId', ?, 'rating', ?, 'created_at', NOW()))",
    //         [storeId, JSON.stringify([{ userId, rating, created_at: new Date() }]), userId, rating]
    //     );
    // },
    // addRating : async (userId, storeId, rating) => {
    //     try {
    //         // First, check if a row exists for the given storeId
    //         const [existing] = await db.promise().query("SELECT ratings FROM ratings WHERE store_id = ?", [storeId]);
    
    //         if (existing.length === 0) {
    //             // If no existing row, insert a new one with an initial JSON array
    //             await db.promise().query(
    //                 "INSERT INTO ratings (store_id, ratings) VALUES (?, JSON_ARRAY(JSON_OBJECT('userId', ?, 'rating', ?, 'created_at', NOW())))",
    //                 [storeId, userId, rating]
    //             );
    //         } else {
    //             // If a row exists, update by appending to the JSON array
    //             await db.promise().query(
    //                 "UPDATE ratings SET ratings = JSON_ARRAY_APPEND(ratings, '$', JSON_OBJECT('userId', ?, 'rating', ?, 'created_at', NOW())) WHERE store_id = ?",
    //                 [userId, rating, storeId]
    //             );
    //         }
    //     } catch (error) {
    //         console.error("Error adding rating:", error);
    //         throw error;
    //     }
    // },
    addRating: async (userId, storeId, rating) => {
        try {
            // Fetch existing ratings for the store
            const [existing] = await db.promise().query("SELECT ratings FROM ratings WHERE store_id = ?", [storeId]);
    
            if (existing.length === 0 || !existing[0].ratings) {
                // Insert a new row if no ratings exist
                await db.promise().query(
                    "INSERT INTO ratings (store_id, ratings) VALUES (?, ?)",
                    [storeId, JSON.stringify([{ userId, rating, created_at: new Date().toISOString() }])]
                );
            } else {
                // If ratings exist, check if it's already a valid JSON object or needs parsing
                let ratingsArray = typeof existing[0].ratings === "string" 
                    ? JSON.parse(existing[0].ratings) 
                    : existing[0].ratings;
    
                // Check if user already rated
                let userIndex = ratingsArray.findIndex(r => r.userId === userId);
    
                if (userIndex !== -1) {
                    // Update the existing rating
                    ratingsArray[userIndex].rating = rating;
                    ratingsArray[userIndex].created_at = new Date().toISOString();
                } else {
                    // Append a new rating
                    ratingsArray.push({ userId, rating, created_at: new Date().toISOString() });
                }
    
                // Update the ratings in the database
                await db.promise().query(
                    "UPDATE ratings SET ratings = ? WHERE store_id = ?",
                    [JSON.stringify(ratingsArray), storeId]
                );
            }
        } catch (error) {
            console.error("Error adding/updating rating:", error);
            throw error;
        }
    },
    
    // getByStoreId :async (storeId) => {
    //     const [rows] = await db.promise().query("SELECT ratings FROM ratings WHERE store_id = ?", [storeId]);
    //     // const [rows] = await db.promise().query(`SELECT r.store_id, r.ratings, r.created_at, u.id AS userId, u.username 
    //     //      FROM ratings r 
    //     //      JOIN users u ON JSON_UNQUOTE(JSON_EXTRACT(r.rating, '$.userId')) = u.id
    //     //      WHERE r.store_id = ?`, [storeId]);
        
    //     if (rows.length === 0) {
    //         // console.log(rows);
    //         return null;
    //     }
        
    //     // Ensure proper JSON parsing
    //     const ratings = rows[0].ratings;
    //     console.log("ratings123",ratings);
    //     // console.log("ratings",ratings,"rows",rows,"name",ratings[0].userId);
    //     const [udetails]=await db.promise().query("select name ,email from users where id= ?",[ratings[0].userId]);
    //     // console.log("udetails",udetails[0]);
    //     const name=udetails[0].name;
    //     const email=udetails[0].email;
    //     const obj={...ratings[0],name,email};
    
    //     return typeof ratings === "string" ? JSON.parse(obj) : obj;
    // }
    getByStoreId : async (storeId) => {
        try {
            // Fetch ratings JSON array for the given storeId
            const [rows] = await db.promise().query("SELECT ratings FROM ratings WHERE store_id = ?", [storeId]);
    
            if (rows.length === 0 || !rows[0].ratings) {
                return null;
            }
    
            // Parse ratings JSON array
            const ratings = typeof rows[0].ratings === "string" ? JSON.parse(rows[0].ratings) : rows[0].ratings;
    
            // Extract unique userIds from ratings
            const userIds = [...new Set(ratings.map((r) => r.userId))];
    
            if (userIds.length === 0) return ratings; // If no valid users, return ratings as is
    
            // Fetch user details in a single query
            const [userDetails] = await db.promise().query(
                `SELECT id, name, email FROM users WHERE id IN (?)`,
                [userIds]
            );
    
            // Create a user lookup object
            const userMap = {};
            userDetails.forEach(({ id, name, email }) => {
                userMap[id] = { name, email };
            });
    
            // Attach user details to each rating
            const enrichedRatings = ratings.map((rating) => ({
                ...rating,
                name: userMap[rating.userId]?.name || "Unknown",
                email: userMap[rating.userId]?.email || "Unknown",
            }));
    
            return enrichedRatings;
        } catch (error) {
            console.error("Error fetching ratings:", error);
            throw error;
        }
    }
};

module.exports = Rating;
